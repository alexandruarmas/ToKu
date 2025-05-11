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
          <span>Camera & Background Tips</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle>Camera & Background Tips</DialogTitle>
          <DialogDescription className="text-gray-400">
            Get the most out of your video calls
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div>
            <h3 className="text-sm font-medium mb-1">Virtual Backgrounds</h3>
            <p className="text-xs text-gray-400">
              To add your own background images:
            </p>
            <ol className="text-xs text-gray-400 list-decimal pl-4 mt-1 space-y-1">
              <li>Click the "Add" button in the background options</li>
              <li>Select an image from your computer</li>
              <li>The image will be available immediately as a background option</li>
            </ol>
            <p className="text-xs text-gray-400 mt-2">
              Your uploaded backgrounds are available for the current session only and will be removed when you close the app.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Lighting Tips</h3>
            <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
              <li>Position yourself facing a light source, not with light behind you</li>
              <li>Avoid sitting with a window directly behind you</li>
              <li>Use a desk lamp pointing at your face for better illumination</li>
              <li>Enable the "Adjust for Low Light" setting in poor lighting conditions</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Camera Position</h3>
            <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
              <li>Position your camera at eye level or slightly above</li>
              <li>Sit an arm's length away from the camera</li>
              <li>Center yourself in the frame</li>
              <li>Look at the camera when speaking, not at your own preview</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 