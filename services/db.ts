
import Dexie, { Table } from 'dexie';
import { Event, CompanyInfo } from '../types';
import { getEvents as getInitialEvents } from './mockData';

export const db = new Dexie('TicketHubDB') as Dexie & {
  events: Table<Event>;
  companyInfo: Table<CompanyInfo>;
};

// Define schema for version 1 (what exists)
db.version(1).stores({
  events: '++id, title, date, location, category, price'
});

// Upgrade to version 2, add companyInfo table
db.version(2).stores({
  events: '++id, title, date, location, category, price',
  companyInfo: '&id' // '&id' means it's a primary key, non-auto-incrementing. We'll use a static ID of 1.
});

export async function populate() {
  // Populate events
  const eventCount = await db.events.count();
  if (eventCount === 0) {
    console.log("O banco de dados de eventos está vazio, populando com dados iniciais...");
    try {
      // Adiciona a propriedade reminderSet aos eventos iniciais
      const initialEvents = getInitialEvents().map(e => ({ ...e, reminderSet: false }));
      await db.events.bulkAdd(initialEvents);
      console.log("Banco de dados de eventos populado com sucesso.");
    } catch (error) {
      console.error("Falha ao popular o banco de dados de eventos:", error);
    }
  }

  // Populate company info, only if version 2 schema is active
  if (db.table('companyInfo')) {
      const companyInfoCount = await db.companyInfo.count();
      if (companyInfoCount === 0) {
        console.log("As informações da empresa não existem, populando com dados padrão...");
        try {
            await db.companyInfo.add({
                id: 1,
                name: 'TicketHub Soluções Digitais',
                email: 'contato@tickethub.com',
                cnpj: '12.345.678/0001-99',
                pixKey: 'chave.pix@email.com.br',
                pixQrCodePayload: '00020126580014br.gov.bcb.pix2576qr.pagsimples.com.br/v2/a7a7d3a0a4b34a6a8f7c6e2b5a9d8e5c5204000053039865802BR5913PagSimples6009SAO PAULO62070503***6304E6B6'
            });
            console.log("Informações da empresa populadas com sucesso.");
        } catch (error) {
            console.error("Falha ao popular as informações da empresa:", error);
        }
      }
  }
}