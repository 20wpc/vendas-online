
import React, { useState, useEffect } from 'react';
import { Event, CompanyInfo } from '../types';
import { WhatsAppIcon, CopyIcon } from './icons';

interface TicketPurchaseModalProps {
  event: Event;
  onClose: () => void;
  companyInfo: CompanyInfo | null;
}

const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({ event, onClose, companyInfo }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [copyButtonText, setCopyButtonText] = useState('Copiar');
  
  const pixKey = companyInfo?.pixKey || 'Chave PIX não configurada.';
  const pixQrCodePayload = companyInfo?.pixQrCodePayload;
  const qrCodeUrl = pixQrCodePayload ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixQrCodePayload)}` : '';


  const totalPrice = (event.price * quantity).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod !== 'card') return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  const handleWhatsAppPayment = () => {
    if (!name || !email) {
        alert("Por favor, preencha seu nome e e-mail antes de continuar.");
        return;
    }

    const paymentLink = `https://pagar.me/simulado/${Date.now()}`;
    const message = `Olá! Aqui está o link para pagamento dos seus ${quantity} ingresso(s) para "${event.title}":

Total: R$ ${totalPrice}

Pague aqui: ${paymentLink}

Obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleCopyPixKey = () => {
    if (!pixKey || !companyInfo?.pixKey) return;
    navigator.clipboard.writeText(pixKey).then(() => {
        setCopyButtonText('Copiado!');
        setTimeout(() => setCopyButtonText('Copiar'), 2000);
    }).catch(err => {
        console.error('Falha ao copiar texto: ', err);
        alert('Falha ao copiar a chave PIX.');
    });
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-all animate-slide-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
        
        {isSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Compra Realizada com Sucesso!</h2>
            <p className="text-slate-300 mb-2">Obrigado, {name}!</p>
            <p className="text-slate-300">Seus {quantity} ingresso(s) para <strong>{event.title}</strong> foram enviados para {email}.</p>
            <button 
              onClick={onClose}
              className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Comprar Ingressos</h2>
            <p className="text-slate-400 mb-6">para {event.title}</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-300 mb-2">Nome Completo</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-300 mb-2">E-mail</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-700 text-white p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
              </div>
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-slate-300 mb-2">Quantidade</label>
                <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))} min="1" max="10" className="w-full bg-slate-700 text-white p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
              </div>

              <div className="text-xl font-bold text-white mb-6 text-right">
                Total: <span className="text-indigo-400">R$ {totalPrice}</span>
              </div>
              
              <div className="mb-6">
                <label className="block text-slate-300 mb-2">Forma de Pagamento</label>
                <div className="flex border border-slate-600 rounded-lg p-1 bg-slate-900/50">
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                    >
                        Cartão
                    </button>
                    <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${paymentMethod === 'pix' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                    >
                        PIX
                    </button>
                </div>
              </div>

              {paymentMethod === 'pix' && (
                <div className="text-center p-4 bg-slate-700 rounded-lg mb-6 animate-fade-in-fast">
                    {qrCodeUrl ? (
                        <>
                            <p className="text-slate-300 mb-2">Pague com o QR Code abaixo</p>
                            <img src={qrCodeUrl} alt="QR Code PIX" className="w-36 h-36 mx-auto bg-white p-1 rounded-md" />
                            <p className="text-slate-300 my-3 text-sm">ou use a chave "copia e cola"</p>
                            <div className="flex items-center bg-slate-800 rounded-md p-2 text-left">
                                <span className="text-xs text-slate-400 truncate flex-grow">{pixKey}</span>
                                <button 
                                    type="button"
                                    onClick={handleCopyPixKey} 
                                    className="flex items-center gap-1.5 ml-2 bg-slate-600 text-white text-xs font-semibold py-1 px-3 rounded-md hover:bg-slate-500 transition-colors disabled:opacity-50"
                                    disabled={!companyInfo?.pixKey}
                                >
                                    <CopyIcon className="w-4 h-4" />
                                    {copyButtonText}
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-400">O método de pagamento PIX não está configurado. Por favor, contate o suporte.</p>
                    )}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={onClose} className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors duration-300">Cancelar</button>
                  {paymentMethod === 'card' && (
                    <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait">
                      {isSubmitting ? 'Processando...' : 'Confirmar Compra'}
                    </button>
                  )}
                </div>
                <button 
                  type="button" 
                  onClick={handleWhatsAppPayment}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Enviar Link de Pagamento via WhatsApp</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-fade-in-fast {
          animation: fade-in 0.2s ease-out forwards;
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
           animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TicketPurchaseModal;