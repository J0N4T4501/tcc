import { Router } from "express";
import { alterarStatusx, inserirPagamento, inserirPagamentopix, inserirPedido, inserirPedidoItem } from "../repository/pedidoRepository.js";
import { procurarProdutoPorId} from "../repository/produtoRepository.js";
import { acharCupom,  criarNovoPedido, criarNotaFiscal } from "../services/novoProduto.js"
const server = Router();



server.post('/api/pedido/:idUsuario/', async (req, resp) => {
    try {
        const { idUsuario } = req.params;
        const info = req.body;


        const idCupom = await acharCupom(info.cupom);
        const novoPedido = criarNovoPedido(idUsuario, idCupom, info);

        const idPedidoCriado = await inserirPedido(novoPedido);
        await inserirPagamento(idPedidoCriado, info.cartao);

        for (let item of info.produtos) {
            const prod = await procurarProdutoPorId(item.id);
            await inserirPedidoItem(idPedidoCriado, prod.id, item.qtd, prod.valor);
        }

       
        resp.status(204).send();

    }
    catch (err) {
        console.log(err);
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/pedido/status/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        const status = req.body;

        const resposta = await alterarStatus(id, status);
        if (resposta != 1)
            throw new Error('pedido  não pode ser alterado')
        else
            resp.status(204).send();
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }

})


server.put('/pedido/status2/:id', async (req, resp) => {
    try {
        const r = await alterarStatusx();
        resp.send(r);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default server;