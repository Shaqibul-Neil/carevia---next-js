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
    <div className="space-y-8">
      {/* Row 1: Service Description + Caregiver Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Description */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Service Description
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {detailedDescription}
          </p>
        </div>

        {/* Caregiver Profile */}
        {caregiverProfile && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-foreground">
                  Caregiver Profile
                </h3>
                <span className="text-sm text-muted-foreground">
                  • Experience: {caregiverProfile.minimumExperienceYears}+ years
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {caregiverProfile.certifications && (
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caregiverProfile.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {caregiverProfile.languagesSpoken && (
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                    Languages
                  </p>
                  <p className="text-sm text-foreground">
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
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Service Highlights
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {serviceHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0" />
                  <span className="text-sm text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Responsibilities Included */}
        {responsibilitiesIncluded && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Responsibilities
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {responsibilitiesIncluded.map((responsibility, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0" />
                  <span className="text-sm text-foreground">
                    {responsibility}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Measures */}
        {safetyMeasures && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Safety Measures
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {safetyMeasures.idVerified && (
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0" />
                  <span className="text-sm text-foreground">ID Verified</span>
                </div>
              )}
              {safetyMeasures.emergencyTraining && (
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0" />
                  <span className="text-sm text-foreground">
                    Emergency Training
                  </span>
                </div>
              )}
              {safetyMeasures.continuousMonitoring && (
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 shrink-0" />
                  <span className="text-sm text-foreground">
                    Continuous Monitoring
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfo;
