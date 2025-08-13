'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useGroupStore, useAnalysisStore } from '@/stores';
import { useJoinGroup } from '@/hooks/useGroup';
import { useAnalysisStatus, useAnalysisSettingStatus } from '@/hooks/useAnalysis';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RotateCw } from 'lucide-react';

const HEADCOUNT_MIN = 0;
const HEADCOUNT_MAX = 9;

export default function MeetingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [href, setHref] = useState<string>('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const { setIsSingle } = useGroupStore();
  const { setMemberId } = useAnalysisStore();

  const { mutate: joinGroup } = useJoinGroup();

  const {
    data: analysisStatus,
    isSuccess: isSuccessStatus,
    isFetching: isFetchingStatus,
    refetch: refetchStatus,
  } = useAnalysisStatus(params.id);

  const {
    data: settingStatus,
    isFetching: isFetchingSettingStatus,
    refetch: refetchSettingStatus,
  } = useAnalysisSettingStatus();

  const getCountingText = (count: number) => {
    if (count === HEADCOUNT_MIN) return '아직 아무도 조건을 알려주지 않았어요.';
    if (count === HEADCOUNT_MAX) return '모두 입력했어요.';
    return `${count}명의 친구가 입력했어요.`;
  };

  const refresh = () => {
    refetchStatus();
    refetchSettingStatus();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(href);

    toast('초대 링크가 클립보드에 복사됐어요.', {
      style: { marginBottom: '190px' },
    });
  };

  const enterLocation = () => {
    joinGroup(params.id, {
      onSuccess: (response) => {
        setIsSingle(response.data.isSingleMemberGroup);
        router.push(`/${params.id}/location`);
      },
    });
  };

  const getResult = () => {
    router.replace(`/${params.id}/loading`);
  };

  const confirmResult = () => {
    setOpenAlert(true);
    toast('친구가 아직 조건을 입력하고 있는지 확인해 주세요.', {
      duration: 3000,
      style: { marginBottom: '220px' },
    });
  };

  useEffect(() => {
    const storedMemberId = Number(window.localStorage.getItem('memberId') || '0');

    setMemberId(storedMemberId);
    setHref(window.location.href);
  }, []);

  if (!isSuccessStatus) return <LoadingSpinner />;

  return (
    <section className="h-full flex flex-col justify-end gap-[22vh]">
      <article>
        <h3
          className={`font-cafe24-pro-up text-[128px] text-center ${analysisStatus?.submittedCount > 0 ? 'text-gradient' : 'text-muted-medium'}`}
        >
          {analysisStatus?.submittedCount}
        </h3>
        <div className="w-full flex justify-center items-center gap-2">
          <p className="text-lg font-semibold">{getCountingText(analysisStatus?.submittedCount)}</p>
          <button
            type="button"
            className={`cursor-pointer hover:animate-spin ${isFetchingStatus || isFetchingSettingStatus ? 'animate-spin' : ''}`}
            aria-label="새로고침"
            onClick={refresh}
          >
            <RotateCw size={16} />
          </button>
        </div>
      </article>
      <AlertDialog open={openAlert}>
        <div>
          <div className="flex flex-col gap-2 p-5">
            <AlertDialogTrigger asChild>
              <Button
                variant={analysisStatus?.submittedCount === HEADCOUNT_MAX ? 'primary' : 'secondary'}
                className="h-fit p-4"
                onClick={
                  analysisStatus?.isAnalysisStartConditionSatisfied ? confirmResult : copyLink
                }
              >
                {analysisStatus?.isAnalysisStartConditionSatisfied
                  ? '결과 조회하기'
                  : '그룹에 초대하기'}
              </Button>
            </AlertDialogTrigger>
            <Button
              variant="primary"
              className="h-fit p-4"
              disabled={
                settingStatus?.isSubmitted || analysisStatus?.submittedCount === HEADCOUNT_MAX
              }
              onClick={enterLocation}
            >
              {settingStatus?.isSubmitted ? '나의 조건을 이미 입력했어요.' : '나의 조건 알려주기'}
            </Button>
          </div>
          <p className="text-xs text-muted-dark text-center pb-7">최대 9명까지 입력할 수 있어요.</p>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>그룹 결과를 조회할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              입력이 완료된 사람들의 조건만 검색됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={getResult}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
