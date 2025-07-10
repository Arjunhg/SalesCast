'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore';
import { PlusIcon, Sparkles } from 'lucide-react';
import MultipStepForm from './MultipStepForm';
import { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import CTAStep from './CTAStep';
import AdditionalInfoStep from './AdditionalInfoStep';
import SuccessStep from './SuccessStep';

type Props = {
    
}

const CreateWebinarButton = (props: Props) => {

  const { isModelOpen, setModelOpen, isComplete, setComplete, resetForm } = useWebinarStore();
  // alert(isModelOpen);

  const [webinarLink, setWebinarLink] = useState('');

  const steps = [
    {
      id: 'basicInfo',
      title: 'Basic Information',
      description: 'Provide the basic details of your webinar.',
      component: <BasicInfoForm />
    },
    {
      id: 'cta',
      title: 'CTA',
      description: 'Please provide the end-point for your customers through your webinar',
      component: (
        <CTAStep
          assistants={[]}
          stripeProducts={[]}
        />
      ),
    },
    {
      id: 'additionalInfo',
      title: 'Additional information',
      description: 'Please fill out information about additional options if necessary',
      component: <AdditionalInfoStep/>,
    },
  ]

  const handleCreateNew = () => {
    resetForm();
  }

  const handleComplete = (webinarId: string) => {
    setComplete(true);
    setWebinarLink(
      `${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`
    )
  }


  return (
    <Dialog open={isModelOpen} onOpenChange={setModelOpen}>
      <DialogTrigger asChild>
        <button
          className="group rounded-2xl flex gap-3 items-center hover:cursor-pointer px-6 py-3 border border-white/20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm text-sm font-semibold text-gray-900 dark:text-white hover:scale-105 transition-all duration-300 hover:shadow-lg"
          onClick={() => setModelOpen(true)}
        >
          <div className="p-1 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
            <PlusIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          Create Webinar
      </button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-[900px] p-0 bg-transparent border-none'>
      {
        isComplete ? (
          <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl'>
            <DialogTitle className='sr-only'>Webinar Created</DialogTitle>
              <SuccessStep
                webinarLink={webinarLink}
                onCreateNew={handleCreateNew}
              />
          </div>
        ) : (
          <>
            <DialogTitle className='sr-only'>Create Webinar</DialogTitle>
            {/* <MultiStepForm/> */}
            <MultipStepForm steps={steps} onComplete={handleComplete}/>
          </>
        )
      }
    </DialogContent>
    </Dialog>
  );
}

export default CreateWebinarButton;