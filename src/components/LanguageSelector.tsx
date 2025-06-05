import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LanguageSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const WorldIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #ffffff;
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const LanguageOption = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: ${props => props.isActive ? '#f3f4f6' : 'transparent'};
  color: #374151;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:focus {
    outline: none;
    background-color: #e5e7eb;
  }
`;

const LanguageFlag = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const LanguageName = styled.span`
  font-weight: 500;
`;

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <LanguageSelectorContainer ref={containerRef}>
      <LanguageButton 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar idioma / Change language"
        aria-expanded={isOpen}
      >
        <WorldIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
          <path d="M12 2a10 10 0 0 1 4 8 10 10 0 0 1-4 8 10 10 0 0 1-4-8 10 10 0 0 1 4-8z"/>
        </WorldIcon>
      </LanguageButton>
      
      <DropdownMenu isOpen={isOpen}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            isActive={language.code === i18n.language}
            onClick={() => handleLanguageChange(language.code)}
          >
            <LanguageFlag>{language.flag}</LanguageFlag>
            <LanguageName>{language.name}</LanguageName>
          </LanguageOption>
        ))}
      </DropdownMenu>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector; 