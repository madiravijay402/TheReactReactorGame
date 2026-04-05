import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameStateContext } from '../context/GameStateContext';

const StoryTerminal = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentString = '';
    let i = 0;
    // Clear out previously displayed text when message changes
    setDisplayedText('');
    
    // Safety check in case component unmounts
    const interval = setInterval(() => {
      if (i < message.text.length) {
        currentString += message.text.charAt(i);
        setDisplayedText(currentString);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Faster typing speed for better UX
    
    return () => clearInterval(interval);
  }, [message.text]);

  return (
    <div className={`w-full max-w-5xl mb-8 p-6 border rounded font-mono transition-all duration-700 shadow-xl relative overflow-hidden ${
      message.type === 'success' ? 'bg-emerald-950/80 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
      message.type === 'error' ? 'bg-red-950/80 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' :
      message.type === 'warning' ? 'bg-amber-950/80 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
      'bg-blue-950/80 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
    }`}>
      {/* Scanline overlay for that retro terminal feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_2px,#000_4px)]" />

      <div className="relative z-10 flex flex-col min-h-[5rem]">
        <h3 className={`text-xs tracking-widest mb-3 font-bold uppercase flex items-center ${
          message.type === 'success' ? 'text-emerald-400' :
          message.type === 'error' ? 'text-red-400' :
          message.type === 'warning' ? 'text-amber-400' :
          'text-blue-400'
        }`}>
          {message.type === 'error' && <span className="mr-2 animate-pulse">⚠️</span>}
          {message.type === 'success' && <span className="mr-2">✔️</span>}
          {message.type === 'info' && <span className="mr-2">&gt;</span>}
          {message.type === 'warning' && <span className="mr-2">⚡</span>}
          {message.title}
        </h3>
        
        <p className="text-white/90 text-sm md:text-base leading-relaxed font-semibold">
          {displayedText}
          <span className="w-2 h-4 bg-white inline-block ml-1 animate-pulse align-middle" />
        </p>
      </div>
    </div>
  );
};

const ControlPanel = ({ 
  isCoolantOn, setIsCoolantOn,
  isFuelInjecting, setIsFuelInjecting,
  isIgnitionArmed, setIsIgnitionArmed
}) => {
  return (
    <div className="p-8 border border-green-900/30 rounded-lg bg-zinc-950 flex flex-col w-full h-full justify-between relative group hover:border-green-500/50 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"/>
      
      <div>
        <h2 className="text-white text-2xl font-mono mb-2">{'<ControlPanel />'}</h2>
        <p className="text-green-500/70 font-mono text-xs mb-8">Role: Parent (Manages useState)</p>
      </div>

      <div className="space-y-8 flex-grow flex flex-col justify-center relative z-10">
        {/* Coolant Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white font-mono text-sm uppercase">Coolant Pump</span>
          <button 
            onClick={() => setIsCoolantOn(!isCoolantOn)}
            className={`px-4 py-2 font-mono transition-all duration-300 border ${
              isCoolantOn 
                ? 'bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                : 'bg-transparent text-white border-zinc-600 hover:border-green-500/50'
            }`}
          >
            {isCoolantOn ? 'ACTIVE' : 'INACTIVE'}
          </button>
        </div>

        {/* Fuel Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white font-mono text-sm uppercase">Fuel Injector</span>
          <button 
            onClick={() => setIsFuelInjecting(!isFuelInjecting)}
            className={`px-4 py-2 font-mono transition-all duration-300 border ${
              isFuelInjecting 
                ? 'bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' 
                : 'bg-transparent text-white border-zinc-600 hover:border-green-500/50'
            }`}
          >
            {isFuelInjecting ? 'ACTIVE' : 'INACTIVE'}
          </button>
        </div>

        {/* Ignition Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white font-mono text-sm uppercase">Ignition System</span>
          <button 
            onClick={() => setIsIgnitionArmed(!isIgnitionArmed)}
            className={`px-4 py-2 font-mono transition-all duration-300 border ${
              isIgnitionArmed 
                ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                : 'bg-transparent text-white border-zinc-600 hover:border-amber-500/50'
            }`}
          >
            {isIgnitionArmed ? 'ARMED' : 'DISARMED'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReactorCore = ({ coolantProp, fuelProp, ignitionProp, targetState }) => {
  const isStabilized = 
    coolantProp === targetState.coolant && 
    fuelProp === targetState.fuel && 
    ignitionProp === targetState.ignition;

  return (
    <div className={`p-8 border rounded-lg flex flex-col w-full h-full justify-between transition-colors duration-500 ${
      isStabilized ? 'bg-emerald-950 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.4)]' : 'bg-zinc-950 border-green-900/30'
    }`}>
      <div>
        <h2 className={`text-2xl font-mono mb-2 ${isStabilized ? 'text-emerald-400 font-bold' : 'text-white'}`}>
          {'<ReactorCore />'}
        </h2>
        <p className={`${isStabilized ? 'text-emerald-400/70' : 'text-amber-400/70'} font-mono text-xs mb-8 transition-colors`}>
          Role: Child (Receives read-only Props)
        </p>
      </div>

      <div className="space-y-8 flex-grow flex flex-col justify-center w-full">
        <div className="flex justify-between items-center font-mono">
          <span className="text-white text-sm">Prop: <code className="text-pink-500 px-1 py-0.5 bg-black/50 rounded">coolantProp</code></span>
          <span className={`w-16 text-center py-1 text-xs font-bold border ${coolantProp ? 'text-green-500 bg-green-500/10 border-green-500' : 'text-zinc-500 border-zinc-700'}`}>
            {coolantProp ? 'TRUE' : 'FALSE'}
          </span>
        </div>
        
        <div className="flex justify-between items-center font-mono">
          <span className="text-white text-sm">Prop: <code className="text-pink-500 px-1 py-0.5 bg-black/50 rounded">fuelProp</code></span>
          <span className={`w-16 text-center py-1 text-xs font-bold border ${fuelProp ? 'text-green-500 bg-green-500/10 border-green-500' : 'text-zinc-500 border-zinc-700'}`}>
            {fuelProp ? 'TRUE' : 'FALSE'}
          </span>
        </div>
        
        <div className="flex justify-between items-center font-mono">
          <span className="text-white text-sm">Prop: <code className="text-pink-500 px-1 py-0.5 bg-black/50 rounded">ignitionProp</code></span>
          <span className={`w-16 text-center py-1 text-xs font-bold border ${ignitionProp ? 'text-amber-500 bg-amber-500/10 border-amber-500' : 'text-zinc-500 border-zinc-700'}`}>
            {ignitionProp ? 'TRUE' : 'FALSE'}
          </span>
        </div>
      </div>

      <div className={`mt-8 pt-6 border-t font-mono text-center transition-colors ${isStabilized ? 'border-emerald-400/50' : 'border-green-900/30'}`}>
        {isStabilized ? (
          <h3 className="text-emerald-400 font-bold text-xl animate-pulse">CORE STABILIZED!</h3>
        ) : (
          <>
            <h3 className="text-white mb-2 text-sm uppercase tracking-widest text-zinc-500">Target State Checklist</h3>
            <p className="text-white/50 text-xs">
              Coolant: <span className="text-green-500 font-bold">TRUE</span> |
              Fuel: <span className="text-green-500 font-bold">TRUE</span> |
              Ignition: <span className="text-zinc-400 font-bold">FALSE</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const DataWire = ({ isActive, delay, colorClass = "bg-green-500", glowClass = "shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]" }) => (
  <div className="relative w-full h-1 bg-zinc-900 my-[26px]">
    <div 
      className={`absolute inset-0 transition-all duration-300 ease-linear origin-left ${
        isActive 
          ? `${colorClass} ${glowClass} scale-x-100 opacity-100` 
          : 'bg-zinc-800 scale-x-100 opacity-30'
      }`}
      style={{ transitionDelay: delay }}
    />
    {isActive && (
      <div 
        className="absolute top-1/2 -mt-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[slideRight_1.5s_linear_infinite]"
      />
    )}
  </div>
);

const Level1Game = () => {
  const navigate = useNavigate();
  const { setHighestUnlockedLevel, highestUnlockedLevel } = useContext(GameStateContext);

  // Local state defined in the Parent Component
  const [isCoolantOn, setIsCoolantOn] = useState(false);
  const [isFuelInjecting, setIsFuelInjecting] = useState(false);
  const [isIgnitionArmed, setIsIgnitionArmed] = useState(true); // Default wrong state to trigger warning

  const targetState = {
    coolant: true,
    fuel: true,
    ignition: false
  };

  const isStabilized = 
    isCoolantOn === targetState.coolant && 
    isFuelInjecting === targetState.fuel && 
    isIgnitionArmed === targetState.ignition;

  // Narrative AI logic based on component state
  const getStoryMessage = () => {
    if (isStabilized) return {
      title: "SYSTEM STABILIZED [TUTORIAL COMPLETE]",
      type: "success",
      text: "Excellent work, Technician! You managed Local State with 'useState' in the Parent and passed it down via Props to the Child. Notice how Data flows strictly downwards. This is React's Unidirectional Data Flow!"
    };

    if (isIgnitionArmed && !isCoolantOn && !isFuelInjecting) return {
      title: "INCOMING TRANSMISSION: COMMANDER",
      type: "info",
      text: "The Reactor Core is dead. We need to stabilize it manually. Your Control Panel (Parent) uses 'useState' to store variables. Try clicking a toggle to see how State updates."
    };

    if (isIgnitionArmed && (isCoolantOn || isFuelInjecting)) return {
      title: "WARNING - OVERHEATING RISK",
      type: "error",
      text: "Wait! You left the Ignition Armed! If we inject elements without disarming the emergency ignition first, the core will rupture. DISARM it in the Control Panel using its local state!"
    };

    if (!isIgnitionArmed && isCoolantOn && !isFuelInjecting) return {
      title: "DATALINK ACTIVE: A.I. ASSISTANT",
      type: "info",
      text: "Coolant is active! See that green wire? The Control Panel's state 'isCoolantOn' is passed down to the Reactor Core as a 'Prop'. The Child component reacts instantly to the Parent's state change."
    };

    if (!isIgnitionArmed && !isCoolantOn && isFuelInjecting) return {
      title: "CAUTION - DRY FUEL INJECTION",
      type: "warning",
      text: "You are flowing fuel without coolant. While the React state is functioning perfectly, reactor physics demands both be active to stabilize! Turn on the Coolant!"
    };

    if (!isIgnitionArmed && !isCoolantOn && !isFuelInjecting) return {
      title: "DATALINK ACTIVE: A.I. ASSISTANT",
      type: "info",
      text: "Ignition disarmed. Safe to proceed. Notice how the Core updates instantly? Props are read-only to the Core, only the Control Panel can dictate the true state. Let's get both systems active!"
    };

    return {
      title: "SYSTEM ONLINE",
      type: "info",
      text: "Commander: Almost there. Match the Target State Checklist in the Reactor Core to complete stabilization."
    };
  };

  const storyMessage = getStoryMessage();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden">
      {/* Dynamic Background dots */}
      <div 
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isStabilized ? 'opacity-30' : 'opacity-10'}`} 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />

      {/* Adding CSS animation globally via styles for the wire dots */}
      <style>{`
        @keyframes slideRight {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
      
      {/* Story Terminal - Acts as our Narrative/Hint Guide */}
      <StoryTerminal message={storyMessage} />

      {/* Main Game Layout */}
      <div className="flex flex-col md:flex-row items-stretch justify-center z-10 w-full max-w-5xl gap-4 md:gap-0 relative">
        
        {/* Parent Component */}
        <div className="w-full md:w-[40%] flex min-h-[350px]">
          <ControlPanel 
            isCoolantOn={isCoolantOn} setIsCoolantOn={setIsCoolantOn}
            isFuelInjecting={isFuelInjecting} setIsFuelInjecting={setIsFuelInjecting}
            isIgnitionArmed={isIgnitionArmed} setIsIgnitionArmed={setIsIgnitionArmed}
          />
        </div>

        {/* Visual Connecting Wires (Data Flow) */}
        <div className="hidden md:flex flex-col justify-center items-center w-[20%] px-4 z-0">
          <div className="text-blue-500 font-mono text-[10px] mb-2 font-bold tracking-widest bg-zinc-900/80 px-2 py-1 rounded shadow">PROPS FLOW ↓</div>
          <div className="w-full flex-grow flex flex-col justify-center space-y-6">
            <DataWire isActive={isCoolantOn} delay="0ms" />
            <DataWire isActive={isFuelInjecting} delay="100ms" />
            <DataWire isActive={isIgnitionArmed} delay="200ms" colorClass="bg-amber-500" glowClass="shadow-[0_0_10px_2px_rgba(245,158,11,0.6)]" />
          </div>
          <div className="text-transparent font-mono text-[10px] mt-2 select-none">PROPS FLOW</div> {/* Spacer block for symmetry */}
        </div>

        {/* Mobile Wire Indicator */}
        <div className="md:hidden flex justify-center py-4">
          <div className="h-16 w-1 bg-gradient-to-b from-blue-500/20 to-blue-500/20 relative rounded-full overflow-hidden">
             <div className="absolute top-0 w-full h-1/4 bg-blue-500 animate-[pulse_1.5s_infinite] shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          </div>
        </div>

        {/* Child Component */}
        <div className="w-full md:w-[40%] flex min-h-[350px]">
          <ReactorCore 
            coolantProp={isCoolantOn}
            fuelProp={isFuelInjecting}
            ignitionProp={isIgnitionArmed}
            targetState={targetState}
          />
        </div>

      </div>

      {/* Win State Overlay / Progression */}
      <div className={`mt-10 z-10 transition-all duration-1000 ${isStabilized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button 
          onClick={() => {
            if (highestUnlockedLevel < 2) {
              setHighestUnlockedLevel(2);
            }
            navigate('/'); // Return to dashboard
          }}
          className="px-10 py-5 bg-green-500 text-black font-bold font-mono text-lg hover:bg-green-400 transition-colors uppercase border-4 border-emerald-950 hover:border-white shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)]"
        >
          {highestUnlockedLevel < 2 ? "UNLOCK LEVEL 2" : "RETURN TO DASHBOARD"}
        </button>
      </div>

    </div>
  );
};

export default Level1Game;
