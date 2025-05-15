"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormStepProps } from "./types";

export function SiteForm({ formData, onInputChange, onNext, onBack }: FormStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Step 2 of 3
        </DialogTitle>
        <DialogDescription className="text-xl font-semibold pt-4">
          Site details:
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Project Name<span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            value={formData.site.projectName}
            onChange={(e) => onInputChange('site', 'projectName', e.target.value)}
            placeholder="Project Name" 
            className="w-full" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Project type<span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              value={formData.site.projectType}
              onChange={(e) => onInputChange('site', 'projectType', e.target.value)}
              placeholder="Ex.: 2BHK, G+3" 
              className="w-full" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Site Area</label>
              <span className="text-sm text-neutral-400">optional</span>
            </div>
            <Input 
              type="text" 
              value={formData.site.siteArea}
              onChange={(e) => onInputChange('site', 'siteArea', e.target.value)}
              placeholder="Site area" 
              className="w-full" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Site Address<span className="text-red-500">*</span>
          </label>
          <Input 
            type="text"
            value={formData.site.address}
            onChange={(e) => onInputChange('site', 'address', e.target.value)}
            placeholder="Enter full address including zip code" 
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Geo Location</label>
          <div className="w-full h-[200px] bg-neutral-100 rounded-lg overflow-hidden">
            {/* Map component would go here */}
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end">
        <Button variant="outline" className="mr-2" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button variant="default" className="bg-primary-700" onClick={onNext}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogFooter>
    </>
  );
}
