"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactData {
  service?: string;
  message?: string;
  zip?: string;
}

interface ContactModalContextType {
  isOpen: boolean;
  openModal: (data?: ContactData) => void;
  closeModal: () => void;
  prefilledData: ContactData;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState<ContactData>({});

  const openModal = (data?: ContactData) => {
    if (data) setPrefilledData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefilledData({});
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal, prefilledData }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}
