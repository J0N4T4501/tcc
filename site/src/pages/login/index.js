

import './index.scss';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginU } from '../../api/usuario';
import Storage from 'local-storage';
import Voltar from '../../components/voltar'

import { toast } from 'react-toastify';


export default function LoginUsuarios() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    const navigate = useNavigate();



    async function entrarClick() {


        try {
            const r = await loginU(email, senha);
            Storage('cliente-logado', r);
            toast.dark('Usuario-logado', { autoClose: 400, hideProgressBar: true });
            setTimeout(() => {
                navigate('/')
            }, 1500)
            console.log(r)


        } catch (err) {
            toast.error(err.response.data.erro);
        }




    }




    return (
        <main className='page-loginusu'>
            <div className='divbt'> <Voltar pag='/'></Voltar></div>
           
            <div className='container1'>
                <div>
                    <img src="./assets/images/image 1067.png" alt="" />
                </div>

                <h1>  Login </h1>

                <div>
                    <h3>Email:</h3>
                    <input type="email" placeholder='Digite seu email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div>
                    <h3>Senha:</h3>
                    <input type="password" placeholder='Digite sua senha ' value={senha} onChange={e => setSenha(e.target.value)} />
                </div>

                <div className="cx">
                    <button className='button-entrar' onClick={entrarClick}  >
                        Entrar
                    </button>
                </div>

                <p>Não tem uma conta? <Link to='/cadastrarusuario'>Clique aqui</Link> e cadastre-se</p>

                <h1>Overland</h1>
            </div>

        </main>
    )
}