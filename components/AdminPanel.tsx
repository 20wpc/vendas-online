
import React, { useState, useEffect } from 'react';
import { CompanyInfo } from '../types';

interface AdminPanelProps {
    initialInfo: CompanyInfo | null;
    onSave: (info: CompanyInfo) => void;
    onCancel: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ initialInfo, onSave, onCancel }) => {
    const [formData, setFormData] = useState<CompanyInfo>({
        id: 1,
        name: '',
        email: '',
        cnpj: '',
        pixKey: '',
        pixQrCodePayload: ''
    });

    useEffect(() => {
        if (initialInfo) {
            setFormData(initialInfo);
        }
    }, [initialInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-slate-700 pb-4">Painel Administrativo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-200">Informações da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-slate-300 mb-2 font-semibold">Nome da Empresa</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
                    </div>
                     <div>
                        <label htmlFor="cnpj" className="block text-slate-300 mb-2 font-semibold">CNPJ</label>
                        <input type="text" name="cnpj" id="cnpj" value={formData.cnpj} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-slate-300 mb-2 font-semibold">E-mail de Contato</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
                </div>
                
                <hr className="border-slate-700" />
                
                <h3 className="text-xl font-semibold text-slate-200">Configurações de Pagamento (PIX)</h3>
                 <div>
                    <label htmlFor="pixKey" className="block text-slate-300 mb-2 font-semibold">Chave PIX</label>
                    <input type="text" name="pixKey" id="pixKey" value={formData.pixKey} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="pixQrCodePayload" className="block text-slate-300 mb-2 font-semibold">Payload do QR Code (Copia e Cola)</label>
                    <textarea name="pixQrCodePayload" id="pixQrCodePayload" value={formData.pixQrCodePayload} onChange={handleChange} rows={4} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm" required></textarea>
                    <p className="text-xs text-slate-400 mt-1">Este é o texto completo que será convertido em QR Code. Geralmente começa com "000201...".</p>
                </div>


                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors duration-300">Cancelar</button>
                    <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300">Salvar Alterações</button>
                </div>
            </form>
            <style>{`
                @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;