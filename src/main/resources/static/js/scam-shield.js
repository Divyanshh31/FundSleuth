/* ==========================================================================
   FUNDSLEUTH INVESTMENT SCAM SHIELD & CLAIM CHECKER ENGINE
   OCR text extraction, scam pattern detection, and financial claim verification.
   ========================================================================== */

(function () {
    class ScamShieldEngine {
        static analyzeMessage(text) {
            if (!text || !text.trim()) {
                return { error: 'Please enter or upload an investment message.' };
            }

            const cleanText = text.trim();
            const lower = cleanText.toLowerCase();

            let riskScore = 0;
            const warningSigns = [];
            const verificationSteps = [];

            // Rule 1: Guaranteed Returns
            if (lower.includes('guarantee') || lower.includes('assured') || lower.includes('100% risk free') || lower.includes('fixed return')) {
                riskScore += 45;
                warningSigns.push({
                    level: 'critical',
                    title: '🔴 Guaranteed-Return Language Detected',
                    detail: 'SEBI regulations strictly prohibit mutual funds or advisors from offering guaranteed equity returns. All equity investments carry market risk.'
                });
            }

            // Rule 2: Unrealistic Return Target
            if (lower.includes('double') || lower.includes('35%') || lower.includes('50%') || lower.includes('20% monthly') || lower.includes('100% profit')) {
                riskScore += 30;
                warningSigns.push({
                    level: 'high',
                    title: '🔴 Unrealistic / Exaggerated Return Claim',
                    detail: 'Promising 20% to 50% short-term profits is a classic indicator of Ponzi or fraudulent stock schemes.'
                });
            }

            // Rule 3: Unregulated Messaging Channel
            if (lower.includes('telegram') || lower.includes('vip group') || lower.includes('whatsapp group') || lower.includes('t.me') || lower.includes('join channel')) {
                riskScore += 25;
                warningSigns.push({
                    level: 'medium',
                    title: '🟠 Unverified Telegram/WhatsApp Group Link',
                    detail: 'Illegal stock tip channels use messaging groups to conduct unauthorized pump-and-dump operations.'
                });
            }

            // Rule 4: Urgency and FOMO Pressure
            if (lower.includes('urgent') || lower.includes('secret') || lower.includes('insider') || lower.includes('limited seats') || lower.includes('today only')) {
                riskScore += 15;
                warningSigns.push({
                    level: 'medium',
                    title: '🟠 Artificial Urgency & High-Pressure Tactics',
                    detail: 'Scammers create panic to prevent victims from independently verifying credentials with official regulators.'
                });
            }

            // Rule 5: Personal Payment Request
            if (lower.includes('upi') || lower.includes('transfer money') || lower.includes('personal account') || lower.includes('crypto payment')) {
                riskScore += 35;
                warningSigns.push({
                    level: 'critical',
                    title: '🔴 Request to Transfer Funds to Personal Account',
                    detail: 'Genuine mutual fund investments are ONLY made to official AMC bank accounts or SEBI-registered RTAs (CAMS/KFintech).'
                });
            }

            // Rule 6: Missing SEBI Registration
            if (!lower.includes('sebi reg') && !lower.includes('inm000') && !lower.includes('ina000')) {
                riskScore += 10;
                warningSigns.push({
                    level: 'info',
                    title: '🟡 No Official SEBI Registration Code Identified',
                    detail: 'No verified SEBI RIA (Registered Investment Adviser) or Research Analyst registration ID was found in the message.'
                });
            }

            riskScore = Math.min(100, riskScore);

            // Generate Verification Checklist
            verificationSteps.push('1. Check official entity registration on the SEBI portal (sebi.gov.in).');
            verificationSteps.push('2. Verify payment destination — ensure funds go directly to SEBI-registered AMCs.');
            verificationSteps.push('3. Verify fund scheme SID/KIM documents on official RTA portals (CAMS / KFintech).');
            verificationSteps.push('4. Report suspicious fraudulent channels to the National Cyber Crime Helpline (Call 1930).');

            return {
                riskScore,
                riskLabel: riskScore >= 50 ? 'HIGH RISK' : riskScore >= 20 ? 'MODERATE RISK' : 'LOW RISK',
                warningSigns,
                verificationSteps,
                verdictMessage: riskScore >= 30 
                    ? 'Potential warning signs detected. Verify independently before taking any financial action.' 
                    : 'No critical scam patterns detected. Always verify fund facts independently.'
            };
        }

        static analyzeClaim(claimText) {
            if (!claimText || !claimText.trim()) return null;

            const lower = claimText.toLowerCase();

            const isGuaranteed = lower.includes('guarantee') || lower.includes('assured') || lower.includes('fixed');
            const isHighReturn = lower.includes('20%') || lower.includes('30%') || lower.includes('double');

            return {
                originalClaim: claimText,
                classification: (isGuaranteed || isHighReturn) ? '⚠️ Unsupported / Requires Verification' : 'ℹ️ Standard Financial Claim',
                fact: 'Mutual fund returns depend on underlying market performance and historical returns do not guarantee future results.',
                claim: claimText,
                unverifiedInfo: isGuaranteed ? 'Guaranteed return promise is not permitted under SEBI regulations.' : 'Future return projection cannot be verified.',
                sourceMetadata: {
                    source: 'SEBI Mutual Fund Regulations 2026',
                    asOfDate: 'October 2026',
                    status: 'Verified Rule'
                }
            };
        }
    }

    window.ScamShieldEngine = ScamShieldEngine;
})();
