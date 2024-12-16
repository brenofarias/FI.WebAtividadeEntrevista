function adicionaMascaraCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function removerMascara(cpf) {
    return cpf.replace(/\D/g, ''); 
}

function validaCPF(cpf) {

    cpf = removerMascara(cpf);

    var Soma = 0;
    var Resto;

    if (cpf.length !== 11) return false;
    if (["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"].indexOf(cpf) !== -1) return false;

    for (var i = 1; i <= 9; i++) Soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

$("#CPF").change(function () {
    if (!validaCPF($('#CPF').val()))
        ModalDialog("CPF Inválido", "O CPF informado é inválido");
});


function ExisteCPF(cpf) {

    cpf = removerMascara(cpf)
    var retorno = 0;

    $.ajax({
        url: urlConsultaExisteCpf,
        async: false,
        method: "POST",
        data: {
            "cpf": cpf
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                retorno = r;
            }
    });

    if (retorno == 1)
        return true;

    return false;
}