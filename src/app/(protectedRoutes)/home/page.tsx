import { Upload, Webcam, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";
import OnBoarding from "./_components/OnBoarding";
import FeatureCard from "./_components/FeatureCard";
import FeatureSectionLayout from "./_components/FeatureSectionLayout";
import Image from "next/image";
import { potentialCustomer } from "@/lib/data";
import UserInfoCard from "@/components/ui/ReusableComponents/UserInfoCard";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <div className="w-full mx-auto h-full space-y-12">
            {/* Hero Section */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="space-y-8 flex-1">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Webinar Platform</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent leading-tight">
                            Get maximum conversion from your webinars
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                            Transform your webinars into powerful conversion machines with our advanced analytics and engagement tools.
                        </p>
                    </div>
                    <OnBoarding/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center w-full lg:w-auto">
                    <FeatureCard
                        Icon={<Upload className="w-12 h-12 text-purple-600 dark:text-purple-400"/>}
                        heading="Upload pre-recorded webinars"
                        description="Drag and drop your webinar files for instant processing"
                        link="#"
                    />
                    <FeatureCard
                        Icon={<Webcam className="w-12 h-12 text-blue-600 dark:text-blue-400"/>}
                        heading="Go live instantly"
                        description="Start broadcasting to your audience in seconds"
                        link="/webinars"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-purple-500/20">
                            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">2.4K</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Conversions</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-500/20">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">15.2K</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-green-500/20">
                            <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400"/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureSectionLayout
                    heading="Track your potential customers"
                    link="/lead"
                >
                    <div className="p-6 flex flex-col gap-6 items-start border rounded-3xl border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className="w-full flex justify-between items-center gap-3"> 
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Conversions</p>
                            <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                <p className="text-sm font-medium text-green-700 dark:text-green-400">50</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 items-start w-full">
                            {
                                Array.from({length: 3}).map((_, index) => (
                                    <div key={index} className="w-full group hover:scale-105 transition-all duration-300">
                                        <Image
                                            src='/featurecard.png'
                                            alt='Conversion card'
                                            width={250}
                                            height={250}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </FeatureSectionLayout>

                <FeatureSectionLayout
                    heading='Your current customers'
                    link='/pipeline'
                >
                    <div className="flex gap-4 items-center h-full w-full justify-center relative flex-wrap">
                        {
                            potentialCustomer.slice(0, 2).map((customer, index) => (
                                <UserInfoCard
                                    customer={customer}
                                    tags={customer.tags}
                                    key={index}
                                />
                            ))
                        }

                        <Image
                            src={'/glowCard.png'}
                            alt='Info-card'
                            width={350}
                            height={350}
                            className="object-cover rounded-3xl absolute px-25 mb-28 hidden sm:flex backdrop-blur-[20px] shadow-2xl"
                        />
                    </div>
                </FeatureSectionLayout>
            </div>
        </div>
    )
}

export default HomePage;