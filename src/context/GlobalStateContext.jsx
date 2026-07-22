import { createContext, useContext, useState } from 'react';
import { recentActivities, crowdfundingProjects, splitPayoutHistory } from '../data/mockData';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  // START EMPTY - No pre-existing contracts. All contracts come from marketplace flow.
  const [contracts, setContracts] = useState([]);
  const [activities, setActivities] = useState(recentActivities);
  const [projects, setProjects] = useState(crowdfundingProjects);
  const [payouts, setPayouts] = useState(splitPayoutHistory);
  
  // START EMPTY - Farmer must create Harvest Passport first before selling
  const [supplies, setSupplies] = useState([]);

  // Demands requested by B2B Buyers (B2B Marketplace)
  const [demands, setDemands] = useState([
    {
      id: 'DEMAND-H01',
      buyer: 'Hotel Gumaya Semarang',
      buyerType: 'Hotel (Enterprise)',
      commodity: 'Cabai Merah Keriting',
      requiredGrade: 'A',
      volumeTon: 10,
      location: 'Semarang, Jawa Tengah',
      deadline: '25 Oktober 2026',
      status: 'Mencari Supply'
    },
    {
      id: 'DEMAND-R02',
      buyer: 'RM Padang Sederhana',
      buyerType: 'UMKM Kuliner',
      commodity: 'Bawang Merah Brebes',
      requiredGrade: 'B',
      volumeTon: 3,
      location: 'Semarang, Jawa Tengah',
      deadline: '28 Oktober 2026',
      status: 'Mencari Supply'
    }
  ]);

  const [harvests, setHarvests] = useState([]);

  const [vouchers, setVouchers] = useState([
    { id: 'VCH-101', farmer: 'Pak Suharto', title: 'E-Voucher Pupuk NPK 50kg', partner: 'Toko Tani Subur Bandungan', value: 'Rp 650.000', status: 'Aktif', code: 'NPK-50KG-BAND' },
    { id: 'VCH-102', farmer: 'Pak Suharto', title: 'E-Voucher Bibit Cabai Merah 10 Pack', partner: 'Kios Benih Unggul', value: 'Rp 450.000', status: 'Aktif', code: 'CBI-PREM-10PK' }
  ]);

  // Counter for unique passport IDs (consistent across all views)
  const [passportCounter, setPassportCounter] = useState(1);

  const generatePassportId = () => {
    const id = `AGRI-PP-${String(passportCounter).padStart(4, '0')}`;
    setPassportCounter(prev => prev + 1);
    return id;
  };

  // Add Supply (Farmer uploads harvest passport)
  const addSupply = (newSupply) => {
    const uniqueId = generatePassportId();
    const supplyWithId = { ...newSupply, id: uniqueId };
    setSupplies(prev => [supplyWithId, ...prev]);
    addActivity({
      id: Date.now(),
      type: 'harvest',
      message: `Paspor Panen #${uniqueId} Diterbitkan: ${newSupply.commodity} (${newSupply.weightTon} Ton) oleh ${newSupply.farmer}`,
      time: 'Baru saja',
      icon: '📜'
    });
    return uniqueId;
  };

  // Farmer publishes verified Harvest Passport to Marketplace
  const publishSupplyToMarket = (supplyId, expectedPrice) => {
    setSupplies(prev => prev.map(s => {
      if (s.id === supplyId) {
        return { 
          ...s, 
          isPublished: true, 
          marketStatus: 'Mencari Pembeli',
          expectedPrice: expectedPrice || s.expectedPrice || 35000 
        };
      }
      return s;
    }));

    const target = supplies.find(s => s.id === supplyId);
    addActivity({
      id: Date.now(),
      type: 'contract',
      message: `Paspor #${supplyId} Dipublikasi ke Pasar B2B: ${target?.commodity || 'Panen'} (${target?.weightTon || 10} Ton)`,
      time: 'Baru saja',
      icon: '🚀'
    });
  };

  const addDemand = (newDemand) => {
    setDemands(prev => [newDemand, ...prev]);
    addActivity({
      id: Date.now(),
      type: 'contract',
      message: `Permintaan Pembeli Baru: ${newDemand.buyer} mencari ${newDemand.commodity} Grade ${newDemand.requiredGrade}`,
      time: 'Baru saja',
      icon: '🛒'
    });
  };

  const addContract = (newContract) => {
    setContracts((prev) => [newContract, ...prev]);

    if (newContract.supplyId) {
      setSupplies(prev => prev.map(s => {
        if (s.id === newContract.supplyId) {
          return { ...s, marketStatus: 'Terkunci / Terjual' };
        }
        return s;
      }));
    }
    
    const totalVal = (newContract.price || 35000) * (parseFloat(newContract.volume) * 1000 || 500);
    const newPayout = {
      id: `SP-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Hari ini',
      totalValue: totalVal,
      commodity: newContract.commodity,
      buyer: newContract.buyer,
      farmer: newContract.farmer || 'Pak Suharto',
      farmerShare: Math.round(totalVal * 0.60),
      investorShare: Math.round(totalVal * 0.35),
      platformFee: Math.round(totalVal * 0.05),
      status: 'completed'
    };
    setPayouts(prev => [newPayout, ...prev]);

    addActivity({
      id: Date.now(),
      type: 'contract',
      message: `Kontrak Baru (Paspor #${newContract.supplyId || '-'}): ${newContract.commodity} oleh ${newContract.buyer}`,
      time: 'Baru saja',
      icon: '📝'
    });
  };

  const rejectContract = (contractId, buyerName) => {
    let freedSupplyId = null;
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        freedSupplyId = c.supplyId;
        return { ...c, status: `Ditolak oleh ${buyerName || 'Pembeli'}` };
      }
      return c;
    }));

    if (freedSupplyId) {
      setSupplies(prev => prev.map(s => {
        if (s.id === freedSupplyId) {
          return { ...s, marketStatus: 'Mencari Pembeli' };
        }
        return s;
      }));
    }

    addActivity({
      id: Date.now(),
      type: 'contract',
      message: `Kontrak #${contractId} ditolak oleh ${buyerName}. Paspor dikembalikan ke Pasar B2B!`,
      time: 'Baru saja',
      icon: '↩️'
    });
  };

  const approveContract = (contractId) => {
    let targetSupplyId = null;
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        targetSupplyId = c.supplyId;
        return { ...c, status: 'Aktif' };
      }
      return c;
    }));

    if (targetSupplyId) {
      setSupplies(prev => prev.map(s => {
        if (s.id === targetSupplyId) {
          return { ...s, marketStatus: 'Terkunci / Terjual' };
        }
        return s;
      }));
    }

    addActivity({
      id: Date.now(),
      type: 'contract',
      message: `Kontrak #${contractId} disetujui & stok TERKUNCI permanen!`,
      time: 'Baru saja',
      icon: '🔒'
    });
  };

  const updateContractStatus = (id, newStatus, buyerName) => {
    if (newStatus.startsWith('Ditolak')) {
      rejectContract(id, buyerName);
    } else if (newStatus === 'Aktif') {
      approveContract(id);
    } else {
      setContracts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    }
  };

  const addActivity = (act) => {
    setActivities((prev) => [act, ...prev]);
  };

  const addHarvest = (newHarvest) => {
    setHarvests(prev => [newHarvest, ...prev]);
  };

  // Admin verifies a supply's quality grade via AI Quality Check
  const verifySupplyByAdmin = (supplyId, verifiedGrade) => {
    setSupplies(prev => prev.map(s => {
      if (s.id === supplyId) {
        return {
          ...s,
          aiVerifiedGrade: verifiedGrade || s.claimedGrade,
          verificationStatus: `Terverifikasi AI (Grade ${verifiedGrade || s.claimedGrade})`
        };
      }
      return s;
    }));

    addActivity({
      id: Date.now(),
      type: 'harvest',
      message: `Paspor #${supplyId} Lolos Verifikasi AI! Grade Resmi: ${verifiedGrade}`,
      time: 'Baru saja',
      icon: '✅'
    });
  };

  const fundProject = (projectId, amount) => {
    let targetFarmer = 'Pak Suharto';
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          targetFarmer = p.farmer;
          const newFunding = p.currentFunding + Number(amount);
          return {
            ...p,
            currentFunding: newFunding,
            investors: p.investors + 1,
            status: newFunding >= p.targetFunding ? 'funded' : p.status
          };
        }
        return p;
      })
    );

    const targetProj = projects.find(p => p.id === projectId);
    const newVoucher = {
      id: `VCH-${Math.floor(100 + Math.random() * 900)}`,
      farmer: targetFarmer,
      title: `E-Voucher Saprotan (${targetProj?.title || 'Modal Kerja'})`,
      partner: 'Koperasi Toko Tani Mitra',
      value: `Rp ${Number(amount).toLocaleString('id-ID')}`,
      status: 'Aktif',
      code: `SAPR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setVouchers(prev => [newVoucher, ...prev]);

    addActivity({
      id: Date.now(),
      type: 'funding',
      message: `Pendanaan Rp ${Number(amount).toLocaleString('id-ID')} disetorkan. E-Voucher Saprotan diterbitkan!`,
      time: 'Baru saja',
      icon: '💰'
    });
  };

  return (
    <GlobalStateContext.Provider value={{ 
      contracts, 
      activities, 
      projects, 
      setProjects,
      vouchers,
      supplies,
      demands,
      harvests,
      payouts,
      publishSupplyToMarket,
      addSupply,
      addDemand,
      addHarvest,
      addContract, 
      rejectContract,
      approveContract,
      updateContractStatus, 
      verifySupplyByAdmin,
      addActivity,
      fundProject 
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalStateContext) || {};
