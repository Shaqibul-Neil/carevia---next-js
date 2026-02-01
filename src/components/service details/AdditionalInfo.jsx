import {
  FileText,
  Briefcase,
  Award,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const AdditionalInfo = ({ service }) => {
  const {
    detailedDescription,
    serviceHighlights,
    responsibilitiesIncluded,
    caregiverProfile,
    safetyMeasures,
  } = service;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Row 1: Service Description + Caregiver Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Description */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Service Description
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
              {detailedDescription}
            </p>
          </div>

          {/* Caregiver Profile */}
          {caregiverProfile && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Caregiver Profile
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    • {caregiverProfile.minimumExperienceYears}+ years
                    experience
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                {caregiverProfile.certifications && (
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide mb-3">
                      Certifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {caregiverProfile.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl font-medium border border-emerald-200 dark:border-emerald-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {caregiverProfile.languagesSpoken && (
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide mb-2">
                      Languages Spoken
                    </p>
                    <p className="text-base text-gray-900 dark:text-white font-medium">
                      {caregiverProfile.languagesSpoken.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Service Highlights + Responsibilities + Safety Measures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Highlights */}
          {serviceHighlights && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Service Highlights
                </h3>
              </div>
              <div className="space-y-3">
                {serviceHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Responsibilities Included */}
          {responsibilitiesIncluded && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Responsibilities
                </h3>
              </div>
              <div className="space-y-3">
                {responsibilitiesIncluded.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {responsibility}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Measures */}
          {safetyMeasures && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Safety Measures
                </h3>
              </div>
              <div className="space-y-3">
                {safetyMeasures.idVerified && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      ID Verified
                    </span>
                  </div>
                )}
                {safetyMeasures.emergencyTraining && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Emergency Training
                    </span>
                  </div>
                )}
                {safetyMeasures.continuousMonitoring && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Continuous Monitoring
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
