import React, { createContext, useState, useContext,useEffect } from 'react';

// Create a context
const SidebarContext = createContext();

// Create a provider component
export function SidebarProvider({ children }) {
 //console.log("sidebarProvider created")
  const [no_of_notifications,setNo_of_notifications]=useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function handleNotification(){
    //console.log("clicked");
    //diplay unread notification list,if read notification : update unread notification
    setNo_of_notifications(0);
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Save the counter value to localStorage
    //localStorage.setItem('counter', count.toString());
  }, [no_of_notifications]);


  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar,no_of_notifications,handleNotification }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to consume the context
export function useSidebar() {
 // console.log("Usesidebar")
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}