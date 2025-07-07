'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore';
import { PlusIcon } from 'lucide-react';
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
          className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20"
          onClick={() => setModelOpen(true)}
        >
          <PlusIcon />
          Create Webinar
      </button>
    </DialogTrigger>
    <DialogContent className='sm:max-w-[900px] p-0 bg-transparent border-none'>
      {
        isComplete ? (
          <div className='bg-muted text-primary rounded-lg overflow-hidden'>
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