import './index.scss'
import CabecarioAdmin from '../../components/cabeçarioAdmin'
import Rodape from '../../components/Rodape'
import { useEffect, useState } from 'react'
import Storage from 'local-storage'

import { carregarProdutosPorId } from '../../api/produtoApi'

import Carrinho2 from '../../components/carrinho2'
import { Link, useNavigate } from 'react-router-dom'
import Cabecario from '../../components/cabeçario'
import Voltar from '../../components/voltar'

export default function Carrinho() {
    const[itens,setItens]=useState([])

    const navigate=useNavigate();


    function Continuar(){
        navigate('/ende')
    }

    function qtdItens() {
        return itens.length;
    }

    function removerItem(id) {
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item => item.id != id);

        Storage('carrinho', carrinho);
        carregarCarrinho();
    }

    function calcularValorTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.info.valor * item.qtd;
        }
        return total;
    }

    async function carregarCarrinho() {
        let carrinho = Storage('carrinho');
     
        if (carrinho) {
        
            let temp = [];
            
            for (let produto of carrinho) {
                let p = await carregarProdutosPorId(produto.id);
                console.log(p)
                
                temp.push({
                    produto: p,
                    qtd: produto.qtd
                })
            }

            console.log(temp);
            setItens(temp);
        }
           
    }

    useEffect(() => {
        
        carregarCarrinho();
    }, [])


    return (
        <section className='page-carrinho'>
        
            <Cabecario esconder='sai'/>

            <div className='x1x'>
               
                <h1 className='h1'>Carrinho</h1>
                <Link to='/produtoy'> <p>Voltar as compras</p> </Link>
                <div className='c1' >

                    <div className='cx2'>
                        {itens.map(item =>
                            <Carrinho2 item={item} removerItem={removerItem} /> 
                            )}
                       
                    </div>



                    <div className='c2'>
                        <h3>subtotal</h3>
                        <p> ({qtdItens()} itens)</p>
                        <p> R$ {calcularValorTotal()}   </p>
                        <button onClick={Continuar} >Continuar</button>

                    </div>


                </div>

            </div>


            <Rodape />

        </section>
    )
}