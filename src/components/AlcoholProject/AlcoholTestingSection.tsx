import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ALCOHOL_PROJECT_DATA, VerificationTestCase } from './alcoholProjectData';

export const AlcoholTestingSection: React.FC = () => {
  const tests = ALCOHOL_PROJECT_DATA.verificationTests;
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedTest, setSelectedTest] = useState<VerificationTestCase | null>(null);

  const categories = ['All', 'Power & Boot', 'Sensor Response', 'Threshold Logic', 'Actuation', 'Repeatability'];

  const filteredTests = filterCategory === 'All'
    ? tests
    : tests.filter(t => t.category === filterCategory);

  const getStatusBadge = (status: VerificationTestCase['status']) => {
    switch (status) {
      case 'Passed — Evidence Available':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Passed (Verified)
          </span>
        );
      case 'Bench Tested':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
            Bench Tested
          </span>
        );
      case 'Simulated Only':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Simulated Only
          </span>
        );
      case 'Planned':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Planned (Future)
          </span>
        );
    }
  };

  return (
    <section id="alcohol-testing" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border border-[#253247] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 11 // VERIFICATION &amp; TEST SUITE
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Engineering Test Cases &amp; Observations
          </h3>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-1 bg-[#070A12] p-1 rounded-xl border border-[#253247] text-xs font-mono">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterCategory === c
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#080B12] border border-[#253247]">
          <span className="text-[#64748B] block text-[10px]">TOTAL TEST CASES</span>
          <span className="text-base font-bold text-[#F8FAFC]">{tests.length} Documented</span>
        </div>
        <div className="p-3 rounded-xl bg-[#080B12] border border-emerald-500/30">
          <span className="text-[#64748B] block text-[10px]">VERIFIED PASS</span>
          <span className="text-base font-bold text-emerald-400">4 Hardware Verified</span>
        </div>
        <div className="p-3 rounded-xl bg-[#080B12] border border-[#38BDF8]/30">
          <span className="text-[#64748B] block text-[10px]">BENCH TESTED</span>
          <span className="text-base font-bold text-[#38BDF8]">1 Repeatability Test</span>
        </div>
        <div className="p-3 rounded-xl bg-[#080B12] border border-purple-500/30">
          <span className="text-[#64748B] block text-[10px]">FUTURE LAB SCOPE</span>
          <span className="text-base font-bold text-purple-400">1 Certified Chamber</span>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border border-[#253247] rounded-xl overflow-hidden">
          <thead className="bg-[#080B12] text-[#38BDF8] border-b border-[#253247]">
            <tr>
              <th className="p-3.5">Test ID</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Objective</th>
              <th className="p-3.5">Actual Observation</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Evidence Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#253247] bg-[#0C1220]">
            {filteredTests.map((test) => (
              <tr
                key={test.id}
                onClick={() => setSelectedTest(test)}
                className="hover:bg-[#111B2B] transition-colors cursor-pointer group"
              >
                <td className="p-3.5 font-bold text-[#38BDF8] group-hover:underline">
                  {test.id}
                </td>
                <td className="p-3.5 text-[#94A3B8]">
                  {test.category}
                </td>
                <td className="p-3.5 text-[#F8FAFC] max-w-xs font-sans">
                  {test.objective}
                </td>
                <td className="p-3.5 text-[#CBD5E1] max-w-sm line-clamp-2">
                  {test.actualObservation}
                </td>
                <td className="p-3.5 whitespace-nowrap">
                  {getStatusBadge(test.status)}
                </td>
                <td className="p-3.5 text-right text-[11px] text-[#64748B] font-mono">
                  {test.evidenceRef}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Test Detail Modal */}
      {selectedTest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/80 backdrop-blur-md"
          onClick={() => setSelectedTest(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#0C1220] border-2 border-[#38BDF8]/40 p-6 space-y-4 text-[#F8FAFC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#38BDF8] uppercase">
                  {selectedTest.category} &bull; {selectedTest.id}
                </span>
                <h4 className="text-lg font-bold font-sans mt-0.5">
                  {selectedTest.objective}
                </h4>
              </div>
              <div>{getStatusBadge(selectedTest.status)}</div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-sans">
              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-[#38BDF8] font-mono font-bold block text-xs">Input Condition</span>
                <p className="text-[#CBD5E1]">{selectedTest.inputCondition}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-emerald-400 font-mono font-bold block text-xs">Expected Response</span>
                <p className="text-[#CBD5E1]">{selectedTest.expectedResponse}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-amber-400 font-mono font-bold block text-xs">Actual Bench Observation</span>
                <p className="text-[#CBD5E1]">{selectedTest.actualObservation}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070A12] border border-[#253247] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
              <span>Evidence Reference:</span>
              <span className="text-[#F8FAFC] font-bold">{selectedTest.evidenceRef}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTest(null)}
                className="px-4 py-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono border border-[#253247]"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
