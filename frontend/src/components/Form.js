import React, { useState, useRef } from 'react';
import axios from 'axios';

const MyForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        senha: ''
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const nameInputRef = useRef();  // Referência para o campo 'nome'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Envie os dados para o backend (Django) usando Axios
        try {
            const response = await axios.post('http://localhost:8000/api/usuarios/', formData);

            if (response.status === 201) {
                setModalMessage('Dados gravados com sucesso!');
                setFormData({ nome: '', senha: '' });  // Limpa os campos
                nameInputRef.current.focus();  // Define o foco no campo 'nome'
            }
        } catch (error) {
            setModalMessage('Erro ao enviar dados: ' + error.message);
        }

        setModalVisible(true);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    ref={nameInputRef}
                    placeholder="Nome"
                />
                <p></p>
                <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Senha"
                />
                <p></p>
                <button type="submit">Enviar</button>
            </form>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={() => setModalVisible(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyForm;
