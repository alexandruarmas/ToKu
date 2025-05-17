"use client";

import { Info } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CameraTips = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
          <Info size={14} />
          <span>Sfaturi pentru Cameră și Fundal</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle>Sfaturi pentru Cameră și Fundal</DialogTitle>
          <DialogDescription>Obțineți maximum din apelurile video</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div>
            <h3 className="text-sm font-medium mb-1">Fundaluri Virtuale</h3>
            <p className="text-xs text-gray-400">
              Pentru a adăuga propriile imagini de fundal:
            </p>
            <ol className="text-xs text-gray-400 list-decimal pl-4 mt-1 space-y-1">
              <li>Faceți clic pe butonul "Add"</li>
              <li>Selectați o imagine de pe calculator</li>
              <li>Imaginea va fi disponibilă imediat ca opțiune de fundal</li>
            </ol>
            <p className="text-xs text-gray-400 mt-2">
              Fundalurile încărcate vor fi disponibile doar pentru sesiunea curentă și vor fi eliminate când închideți aplicația.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Sfaturi pentru Iluminare</h3>
            <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
              <li>Poziționați-vă în fața unei surse de lumină, nu cu lumină în spatele tău</li>
              <li>Evită să stai cu o fereastră direct în spatele tău</li>
              <li>Folosește o lampă de birou îndreptată spre fața ta pentru o iluminare mai bună</li>
              <li>Activați setarea "Ajustare Lumină Scăzută" în condiții de iluminare slabă</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Poziția Camerei</h3>
            <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
              <li>Poziționează camera la nivelul ochilor sau ușor deasupra</li>
              <li>Stați la o lungime de braț distanță de cameră</li>
              <li>Centrează-te în cadru</li>
              <li>Arătați către camera când vorbescți, nu către propriul preview</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 