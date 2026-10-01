/* ==========================================================================
   FUNDSLEUTH DATA CONFIDENCE & SOURCE VERIFICATION COMPONENT
   Standardized financial source metadata, verification badges, and trust indicators.
   ========================================================================== */

(function () {
    class DataConfidenceEngine {
        static renderBadge(status = 'verified') {
            if (status === 'verified') {
                return `<span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 rounded-pill font-mono x-small pointer" onclick="window.dataConfidenceEngine.showModal('verified')" title="Click to inspect verification metadata">
                    🟢 Verified / Recent
                </span>`;
            } else if (status === 'older') {
                return `<span class="badge bg-warning bg-opacity-10 text-dark border border-warning border-opacity-30 rounded-pill font-mono x-small pointer" onclick="window.dataConfidenceEngine.showModal('older')" title="Click to inspect verification metadata">
                    🟡 Older Data (30+ Days)
                </span>`;
            } else {
                return `<span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 rounded-pill font-mono x-small pointer" onclick="window.dataConfidenceEngine.showModal('unverified')" title="Click to inspect verification metadata">
                    🔴 Unable to Verify
                </span>`;
            }
        }

        static renderVerifyCard(source = 'Official AMFI NAV API & Scheme Document', asOfDate = '30 Sep 2026') {
            return `
                <div class="p-2.5 bg-light rounded-3 border mt-3 d-flex align-items-center justify-content-between x-small">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-shield-check text-success fs-6"></i>
                        <div>
                            <div class="fw-bold text-dark">Source: ${source}</div>
                            <div class="text-muted font-mono">As of Date: ${asOfDate} • Verified Data</div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary font-mono py-1 px-2 text-dark" onclick="window.dataConfidenceEngine.showModal('verified')">
                        Verify Source
                    </button>
                </div>
            `;
        }

        showModal(status) {
            let title = 'Data Verification Metadata';
            let body = '';

            if (status === 'verified') {
                title = '🟢 Verified / Recent Data';
                body = `
                    <div class="p-3 bg-success bg-opacity-10 rounded-3 border border-success mb-3">
                        <h6 class="fw-bold text-success mb-1">Authoritative Source Verified</h6>
                        <p class="small text-secondary mb-0">This financial data point was fetched from official AMFI NAV releases and SEBI Scheme Information Documents (SID).</p>
                    </div>
                    <ul class="list-unstyled x-small text-muted vstack gap-2">
                        <li><strong>Provider:</strong> Association of Mutual Funds in India (AMFI)</li>
                        <li><strong>Timestamp:</strong> Updated Daily at 11:00 PM IST</li>
                        <li><strong>Verification Status:</strong> 100% Empirically Validated</li>
                    </ul>
                `;
            } else if (status === 'older') {
                title = '🟡 Older Data Notice';
                body = `
                    <div class="p-3 bg-warning bg-opacity-10 rounded-3 border border-warning mb-3">
                        <h6 class="fw-bold text-dark mb-1">Data Needs Refresh</h6>
                        <p class="small text-secondary mb-0">This information is older than 30 days. AMC portfolio holdings are updated monthly.</p>
                    </div>
                `;
            } else {
                title = '🔴 Unable to Verify Data';
                body = `
                    <div class="p-3 bg-danger bg-opacity-10 rounded-3 border border-danger mb-3">
                        <h6 class="fw-bold text-danger mb-1">Unverified Data Warning</h6>
                        <p class="small text-secondary mb-0">This claim or information could not be verified against SEBI or AMFI public registries.</p>
                    </div>
                `;
            }

            if (window.showCustomModal) {
                window.showCustomModal(title, body);
            } else {
                alert(`${title}\n\n${body.replace(/<[^>]*>?/gm, '')}`);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.dataConfidenceEngine = new DataConfidenceEngine();
    });
})();
