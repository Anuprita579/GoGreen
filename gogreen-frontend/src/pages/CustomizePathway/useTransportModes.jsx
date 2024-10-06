import { useState } from 'react';
import { modesOfTransport } from '../../constants/transport';

export const useTransportModes = () => {
  const [selectedModesData, setSelectedModesData] = useState({});
  const [selectedInnerOptions, setSelectedInnerOptions] = useState(null);

  const handleModeSelect = (modeTitle) => {
    setSelectedModesData(prev => ({
      ...prev,
      [modeTitle]: {
        id: modesOfTransport[modeTitle].id,
        title: modeTitle,
        distance: null,
        innerOptionId: selectedInnerOptions || modesOfTransport[modeTitle].children[0].id
      }
    }));
  };

  return {
    selectedModesData,
    selectedInnerOptions,
    handleModeSelect,
    setSelectedInnerOptions
  };
};
