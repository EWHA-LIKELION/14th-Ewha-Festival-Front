/**
 * 만든이들 페이지
 */

import { useEffect } from 'react';
import Header from '@/components/Header';
import creditData from '@/data/creditData.json';

const CreditPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1. organization 기준으로 그룹핑
  const groupedByOrg = creditData.reduce((acc, member) => {
    if (!acc[member.organization]) {
      acc[member.organization] = {};
    }

    // 2. 그 안에서 position 기준으로 또 그룹핑
    if (!acc[member.organization][member.position]) {
      acc[member.organization][member.position] = [];
    }

    acc[member.organization][member.position].push(member);
    return acc;
  }, {});

  return (
    <>
      <Header left="back" center="title" centerTitle="만든이들" />
      <div className="mt-18 flex w-full flex-col">
        <div className="items-center justify-center bg-linear-to-b from-emerald-50 to-white py-8 text-center text-xl font-semibold text-emerald-600">
          2026
          <br />
          이화여대 대동제
          <br />
          만든이들
        </div>

        {Object.entries(groupedByOrg).map(([org, positions]) => (
          <div key={org} className="flex flex-col items-center gap-10 pt-5 pb-20">
            <div className="flex flex-col items-center gap-5">
              {/* organization */}
              <h1 className="text-lg font-semibold text-emerald-800">{org}</h1>

              <div className="flex flex-col items-center gap-11">
                {/* position */}
                {Object.entries(positions).map(([position, members]) => (
                  <div key={position} className="flex flex-col items-center gap-5">
                    <h2 className="w-fit rounded-2xl border border-emerald-400 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                      {position}
                    </h2>

                    {/* members */}
                    {members.map((member, index) => {
                      // 팀원이고, 이전 멤버와 part가 다르면 추가 gap 적용
                      const isPrevPartDifferent =
                        position === '팀원' && index > 0 && members[index - 1].part !== member.part;
                      
                      return (
                        <div
                          key={index}
                          className={`flex flex-col items-center gap-1 ${isPrevPartDifferent ? 'mt-4' : ''}`}
                        >
                          <div className="flex gap-1 text-sm font-semibold">
                            <span className="whitespace-pre text-emerald-800">{member.part}</span>
                            <span className="text-zinc-300">|</span>
                            <span className="text-emerald-600">{member.department}</span>
                            <span className="pl-0.5 text-zinc-800">{member.name}</span>
                          </div>
                          <p className="text-center text-sm whitespace-pre-line text-zinc-500">
                            {member.task}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreditPage;
