let beneficiarios = [];
let edicao = false;
let listaBeneficiarios = [];

$('#cpfBeneficiario').mask('000.000.000-00', { reverse: true });

// Abrir modal de beneficiários
$('#btnBeneficiarios').click(function () {
    $('#modalBeneficiarios').modal('show');
});

function carregaBeneficiarios(ben) {
    if (ben != null) {
        ben.forEach(x => beneficiarios.push(x));
        atualizaGridBeneficiarios();
    }
}

function incluirBeneficiario() {
    var nome = $('#nomeBeneficiario').val();
    var cpf = removerMascara($('#cpfBeneficiario').val());

    if (nome && cpf) {
        if (validaCPF(cpf)) {
            if (!edicao) {
                if (!beneficiarioCPFexiste(cpf)) {
                    var novoBeneficiario = {
                        Nome: nome,
                        CPF: cpf,
                        Status: "Incluir" // Marca o beneficiário como novo
                    };
                    beneficiarios.push(novoBeneficiario);

                    limparCampos();
                    atualizaGridBeneficiarios();
                } else {
                    ModalDialog("CPF Inválido", "Já existe um beneficiario com este CPF");
                }
            }
        } else {
            ModalDialog("CPF Inválido", "CPF informado é inválido");
        }

    } else {
        alert("Preencha todos os campos");
    }

}

function alterarBeneficiario(cpf) {

    const beneficiario = beneficiarios.find(b => b.CPF == cpf);
    if (beneficiario) {
        var cpfAntigo = beneficiario.CPF;
        $('#nomeBeneficiario').val(beneficiario.Nome);
        $('#cpfBeneficiario').val(adicionaMascaraCPF(cpfAntigo));

        edicao = true;
        $('#btnIncluir').text('Salvar Alteração');

        removerBeneficiarioGrid(cpf);

        document.getElementById("btnIncluir").onclick = function () {
            if (edicao) {
                var nome = $('#nomeBeneficiario').val();
                var cpfNovo = removerMascara($('#cpfBeneficiario').val());

                if (nome && cpfNovo) {
                    if (validaCPF(cpfNovo)) {
                        if (!beneficiarioCPFexiste(cpfNovo)) {
                            const beneficiario = beneficiarios.find(b => b.CPF == cpfAntigo);

                            if (beneficiario) {
                                beneficiario.Nome = nome;
                                beneficiario.CPF = cpfNovo;
                                beneficiario.Status = "Alterar";

                                atualizaGridBeneficiarios();
                                limparCampos();

                                edicao = false
                                $('#btnIncluir').text('Incluir');
                            }
                        } else {
                            ModalDialog("CPF Inválido", "Já existe um beneficiario com este CPF");
                        }
                    } else {
                        ModalDialog("CPF Inválido", "CPF informado é inválido");
                    }
                } else {
                    alert("Preencha todos os campos");
                }
            } else {
                incluirBeneficiario();
            }
        }
    }
    
}

function excluirBeneficiario(cpf) {
    const beneficiario = beneficiarios.find(b => b.CPF == cpf);

    if (beneficiario) {
        beneficiario.Status = "Excluir"
    }

    atualizaGridBeneficiarios();
}

function removerBeneficiarioGrid(cpf) {
    listaBeneficiarios = beneficiarios.filter(b => b.CPF != cpf);
    atualizaGridBeneficiarios(false);
}

function beneficiarioCPFexiste(cpf) {
    return beneficiarios.some(b => b.CPF === cpf && b.Status != 'Excluir');
}

function limparCampos() {
    $('#nomeBeneficiario').val('');
    $('#cpfBeneficiario').val('');
}

function atualizaGridBeneficiarios(limparCampos = true) {
    $('#gridBeneficiarios').empty();
    listaBeneficiarios = beneficiarios;
    var benFiltrados = listaBeneficiarios.filter((x) => x.Status != "Excluir");

    benFiltrados.forEach((b, index) => {

        $('#gridBeneficiarios').append(`
            <tr>
                <td>${ b.Nome }</td>
                <td>${ adicionaMascaraCPF(b.CPF) }</td>
                <td class="text-center" style="display: flex; justify-content: center; gap: 8px;">
                    <a class="btn btn-primary btn-sm mr-2" onclick="alterarBeneficiario(${b.CPF})">
                        Alterar
                    </a>
                    <a class="btn btn-primary btn-sm" onClick="excluirBeneficiario(${b.CPF})">
                        Excluir
                    </a>
                </td>
            </tr>
        `);
    });
}