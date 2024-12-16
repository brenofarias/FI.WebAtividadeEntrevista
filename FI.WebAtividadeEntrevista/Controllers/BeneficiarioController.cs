using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        public List<BeneficiarioModel> Listar(long idCliente)
        {
            BoBeneficiario bo = new BoBeneficiario();
            List<Beneficiario> beneficiarios = bo.Listar(idCliente);
            List<BeneficiarioModel> beneficiarioModels = new List<BeneficiarioModel>();

            if (beneficiarios != null)
            {

                foreach (var item in beneficiarios)
                {
                    var model = new BeneficiarioModel
                    {
                        Id = item.Id,
                        Nome = item.Nome,
                        CPF = item.CPF,
                        IdCliente = item.IdCliente
                    };
                    beneficiarioModels.Add(model);
                }
            }

            return beneficiarioModels;
        }

        public void Executar(BeneficiarioModel ben)
        {
            BoBeneficiario bo = new BoBeneficiario();
            var beneficiario = bo.Consultar(ben.Id);

            if (beneficiario is null && ben.Status == "Alterar")
                ben.Status = "Incluir";

            switch (ben.Status)
            {
                case "Incluir":
                    bo.Incluir(new Beneficiario
                    {
                        Id = ben.Id,
                        Nome = ben.Nome,
                        CPF = ben.CPF,
                        IdCliente = ben.IdCliente
                    });
                    break;
                case "Alterar":
                    if (beneficiario != null)
                    {
                        beneficiario.Id = ben.Id;
                        beneficiario.CPF = ben.CPF;
                        beneficiario.Nome = ben.Nome;
                        bo.Alterar(beneficiario);
                    }
                    break;
                case "Excluir":
                    bo.Deletar(ben.Id);
                    break;
            }
        }
    }
}