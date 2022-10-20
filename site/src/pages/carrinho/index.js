import './index.scss'
import CabecarioAdmin from '../../components/cabeçarioAdmin'
import Rodape from '../../components/Rodape'
import { useEffect, useState } from 'react'
import Storage from 'local-storage'
import { Await } from 'react-router-dom'
import { carregarProdutosPorId } from '../../api/produtoApi'
import Car from '../../components/carrinhocomp'

export default function Carrinho(props) {

    function qtdItens(){
     return itens.length;
    }

    function calcularValorTotal(){
        let total= 0;
        for(let item of itens){
           total = total +  item.produto.info.precoInicial * item.qtd
        }
        return total;
    }
    


    const [itens, setItens] = useState([])

    async function carregarCarrinho() {

        let carrinho = Storage('carrinho');
        if (carrinho) {

            let temp = [];

            for (let produto of carrinho) {
                let p = await carregarProdutosPorId(produto.id);

                temp.push({
                    produto: p,
                    qtd: produto.qtd
                })
            }
            console.log(temp);
            setItens(temp);
        }

    }
    function removerItem(id){
        let carrinho =  Storage('carrinho')
        carrinho= carrinho.filter(item=> item.id !=id)


        Storage('carrinho', carrinho);  
        carregarCarrinho();
    }




    useEffect(() => {
        carregarCarrinho();

    }, []);


    return (
        <section className='page-carrinho'>
            <CabecarioAdmin />
            <div className='x1x'>
                <h1>Carrinho</h1>

                <div className='c1' >

              <div className='cx2'>
                 {itens.map(item =>
                     <Car item={item} removerItem={removerItem} carregarCarrinho={carregarCarrinho} />
                    )} 
              </div>
                 
                 
                



                    <div className='c2'>
                        <h3>subtotal</h3>
                        <p>{qtdItens()} itens</p>
                        <p>R$ {calcularValorTotal()} </p>
                        <button>Fechar Pedido</button>

                    </div>


                </div>

            </div>


            <Rodape />

        </section>
    )
}