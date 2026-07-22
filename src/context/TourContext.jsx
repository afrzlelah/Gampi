import { createContext, useContext, useState, useEffect } from 'react';

const TOUR_STORAGE_KEY = 'agridaya_forced_tour_completed_v1';
const TOUR_STEP_KEY = 'agridaya_forced_tour_current_step_v1';

export const STEPS = {
  NOT_STARTED: 0,
  LOGIN_FARMER: 1,
  NAV_ACADEMY: 2,
  TOUR_ACADEMY: 3,
  TOUR_DASHBOARD: 4,
  TOUR_FARM_IDENTITY: 5,
  TOUR_KARSA: 6,
  TOUR_REPUTATION: 7,
  CREATE_PASSPORT: 8,
  SWITCH_ADMIN_VERIFY: 9,
  ADMIN_QUALITY_CHECK: 10,
  SWITCH_FARMER_PUBLISH: 11,
  PUBLISH_TO_MARKET: 12,
  SWITCH_BUYER: 13,
  BUYER_MARKETPLACE: 14,
  BUYER_APPROVE_CONTRACT: 15,
  SWITCH_FARMER_CROWDFUND: 16,
  CREATE_CROWDFUND: 17,
  SWITCH_INVESTOR: 18,
  INVESTOR_FUND: 19,
  FINISHED: 20
};

const TourContext = createContext();

export function TourProvider({ children }) {
  const [tourCompleted, setTourCompleted] = useState(() => {
    return localStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  });

  const [currentStep, setCurrentStep] = useState(() => {
    if (localStorage.getItem(TOUR_STORAGE_KEY) === 'true') {
      return STEPS.NOT_STARTED;
    }
    const savedStep = localStorage.getItem(TOUR_STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : STEPS.LOGIN_FARMER;
  });

  const [createdPassportId, setCreatedPassportId] = useState('');
  const [createdProjectId, setCreatedProjectId] = useState('');
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    if (!tourCompleted && currentStep !== STEPS.FINISHED) {
      localStorage.setItem(TOUR_STEP_KEY, currentStep.toString());
    }
  }, [currentStep, tourCompleted]);

  useEffect(() => {
    if (currentStep === STEPS.FINISHED) {
      setShowFinishModal(true);
    }
  }, [currentStep]);

  const advanceTour = (nextStep) => {
    if (tourCompleted) return;
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const finishTour = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    localStorage.removeItem(TOUR_STEP_KEY);
    setTourCompleted(true);
    setShowFinishModal(false);
    setCurrentStep(STEPS.NOT_STARTED);
  };

  const resetTour = () => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
    localStorage.setItem(TOUR_STEP_KEY, STEPS.LOGIN_FARMER.toString());
    setTourCompleted(false);
    setShowFinishModal(false);
    setCurrentStep(STEPS.LOGIN_FARMER);
  };

  return (
    <TourContext.Provider value={{
      isTourActive: !tourCompleted && currentStep > STEPS.NOT_STARTED && currentStep < STEPS.FINISHED,
      tourCompleted,
      currentStep,
      showFinishModal,
      advanceTour,
      finishTour,
      resetTour,
      createdPassportId,
      setCreatedPassportId,
      createdProjectId,
      setCreatedProjectId
    }}>
      {children}
    </TourContext.Provider>
  );
}

export const useTour = () => useContext(TourContext) || {};
