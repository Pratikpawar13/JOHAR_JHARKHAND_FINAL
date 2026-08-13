import React from 'react';
import { AlertTriangle } from 'lucide-react';

const CovidAdvisory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Header Image Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://static.vecteezy.com/system/resources/thumbnails/040/688/242/small_2x/lotus-mandala-art-blank-horizontal-background-in-luxurious-and-minimalist-orange-peel-hue-theme-vector.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Covid-19 Advisory
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <AlertTriangle size={24} className="text-red-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Covid-19 Advisory for Jharkhand
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            The state of Jharkhand has released new travel guidelines considering the ongoing
            situation of the Covid-19 pandemic. While the Government lifted most of the travel
            restrictions in several phases post Covid-19 lockdown, the potential for future waves
            has prompted the Government to maintain updated guidelines.
          </p>

          <p className="text-gray-700 mb-6">
            In a bid to manage any resurgence of Coronavirus, the Government has issued guidelines
            to ensure safe travel. Given below are the intra-state and inter-state travel
            guidelines for Jharkhand. The information is subject to change as per the updates
            issued by the Jharkhand Government.
          </p>

          {/* Interstate Guidelines */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              Jharkhand Interstate Travel Guidelines
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                All passengers traveling to the state of Jharkhand from other states or UTs are
                recommended to carry a negative RT-PCR report, not older than 72 hours, from an
                ICMR-approved laboratory, though this is not currently mandatory as of September
                2025.
              </li>
              <li>All passengers are encouraged to download the Aarogya Setu app for health monitoring.</li>
              <li>
                Passengers traveling to Ranchi are advised to register on the Jharkhand COVID-19
                portal and download the 'Pratirakshak' app for self-reporting.
              </li>
            </ul>
          </div>

          {/* Intrastate Guidelines */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              Jharkhand Intrastate Travel Guidelines
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>No restrictions on intrastate travel as per the latest guidelines issued by the state government.</li>
            </ul>
          </div>

          {/* Additional Information */}
          <p className="text-gray-700 mb-6">
            For more information, check out:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <a
                href="https://www.jharkhand.gov.in/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                COVID State-wise Status
              </a>
            </li>
            <li>
              <a
                href="https://www.jharkhand.gov.in/covid19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                COVID Information Portal, Jharkhand
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CovidAdvisory;