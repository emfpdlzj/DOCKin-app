import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { AppInput } from "@/src/components/common/AppInput";
import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { safetyService } from "@/src/services/safetyService";
import { theme } from "@/src/theme/theme";
import { ChecklistStatus } from "@/src/types";
import type { ChecklistItem, SafetyEducation } from "@/src/types";

function buildInspectionGroups(period: "day" | "week" | "month"): {
  title: string;
  completedCount: number;
  totalCount: number;
  items: ChecklistItem[];
}[] {
  const itemSet =
    period === "day"
      ? [
          {
            title: "안전교육이수",
            completedCount: 0,
            totalCount: 3,
            items: [
              { id: 1, label: "안전교육강연 감독", description: "장소: 제강현", status: ChecklistStatus.TODO },
              { id: 2, label: "안전서약서 취합 및 제출", description: "장소: 본관 1층", status: ChecklistStatus.TODO },
              { id: 3, label: "안전교육 관리자 회의", description: "시간: 오전 10:20~11:30", status: ChecklistStatus.TODO },
            ],
          },
          {
            title: "제 8조선소 점검목록",
            completedCount: 5,
            totalCount: 8,
            items: [
              { id: 4, label: "작업장 정리정돈 상태 확인", status: ChecklistStatus.DONE },
              { id: 5, label: "근무자 안전 장비 생산년도 조사", status: ChecklistStatus.DONE },
              { id: 6, label: "작업 후 잔류 위험요소 점검", status: ChecklistStatus.DONE },
              { id: 7, label: "화기 작업 구역 소화기 비치 확인", status: ChecklistStatus.DONE },
              { id: 8, label: "고소 작업 발판 체결 상태 점검", status: ChecklistStatus.DONE },
              { id: 9, label: "협소 구역 환기 장비 작동 확인", status: ChecklistStatus.TODO },
              { id: 10, label: "이동 동선 적치물 제거 확인", status: ChecklistStatus.TODO },
              { id: 11, label: "작업 전 안전표지 부착 상태 점검", status: ChecklistStatus.TODO },
            ],
          },
          {
            title: "서류 및 행정",
            completedCount: 3,
            totalCount: 4,
            items: [
              { id: 7, label: "근무일지 서명 확인", status: ChecklistStatus.DONE },
              { id: 8, label: "작업허가서 갱신", status: ChecklistStatus.DONE },
              { id: 12, label: "특수 작업 승인 문서 검토", status: ChecklistStatus.DONE },
              { id: 13, label: "작업자 안전 서약서 재확인", status: ChecklistStatus.TODO },
            ],
          },
        ]
      : period === "week"
        ? [
            {
              title: "주간 교육 현황",
              completedCount: 2,
              totalCount: 5,
              items: [
                { id: 9, label: "주간 안전조회 참석", status: ChecklistStatus.DONE },
                { id: 10, label: "위험예지 훈련", status: ChecklistStatus.DONE },
                { id: 11, label: "현장 비상대피 리허설", status: ChecklistStatus.TODO },
                { id: 14, label: "주간 신규 인원 안전교육", status: ChecklistStatus.TODO },
                { id: 15, label: "사고사례 공유 브리핑", status: ChecklistStatus.TODO },
              ],
            },
            {
              title: "주간 설비 점검",
              completedCount: 4,
              totalCount: 7,
              items: [
                { id: 12, label: "용접 장비 누전 점검", status: ChecklistStatus.DONE },
                { id: 13, label: "발판 안전난간 상태 확인", status: ChecklistStatus.DONE },
                { id: 16, label: "비상 전원 설비 작동 확인", status: ChecklistStatus.DONE },
                { id: 17, label: "환기 설비 점검 기록 확인", status: ChecklistStatus.DONE },
                { id: 18, label: "중장비 후방 경고등 작동 점검", status: ChecklistStatus.TODO },
                { id: 19, label: "가설 통로 미끄럼 방지 상태 확인", status: ChecklistStatus.TODO },
                { id: 20, label: "임시 배선 정리 상태 확인", status: ChecklistStatus.TODO },
              ],
            },
          ]
        : [
            {
              title: "월간 안전 점검",
              completedCount: 7,
              totalCount: 12,
              items: [
                { id: 14, label: "월간 사고 사례 교육", status: ChecklistStatus.DONE },
                { id: 15, label: "중량물 이동 경로 점검", status: ChecklistStatus.DONE },
                { id: 16, label: "화재대피 훈련", status: ChecklistStatus.DONE },
                { id: 21, label: "산소 절단 장비 월간 점검", status: ChecklistStatus.DONE },
                { id: 22, label: "고소 작업 보호구 재고 확인", status: ChecklistStatus.DONE },
                { id: 23, label: "협력사 안전교육 이수 현황 검토", status: ChecklistStatus.DONE },
                { id: 24, label: "현장 비상 연락망 최신화", status: ChecklistStatus.DONE },
                { id: 25, label: "정기 소방 훈련 계획 검토", status: ChecklistStatus.TODO },
                { id: 26, label: "밀폐공간 측정 장비 교정 확인", status: ChecklistStatus.TODO },
                { id: 27, label: "월간 위험성 평가 회의 준비", status: ChecklistStatus.TODO },
                { id: 28, label: "안전 표지판 훼손 여부 전수조사", status: ChecklistStatus.TODO },
                { id: 29, label: "재해 예방 캠페인 자료 배포", status: ChecklistStatus.TODO },
              ],
            },
            {
              title: "행정 서류 검토",
              completedCount: 5,
              totalCount: 6,
              items: [
                { id: 17, label: "안전교육 이수 서류 제출", status: ChecklistStatus.DONE },
                { id: 18, label: "월간 점검 결과 보고", status: ChecklistStatus.DONE },
                { id: 30, label: "위험물 반입 기록 검토", status: ChecklistStatus.DONE },
                { id: 31, label: "작업허가서 보관 현황 점검", status: ChecklistStatus.DONE },
                { id: 32, label: "안전보호구 지급 대장 정리", status: ChecklistStatus.DONE },
                { id: 33, label: "월간 교육 참석 서명 누락 확인", status: ChecklistStatus.TODO },
              ],
            },
          ];

  return itemSet;
}

export function SafetyEducationScreen() {
  const [mode, setMode] = useState<"education" | "inspection">("education");
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<SafetyEducation | null>(null);
  const [completing, setCompleting] = useState(false);

  const loadEducations = useCallback(() => safetyService.getEducationList(), []);
  const loadUncompleted = useCallback(() => safetyService.getUncompletedVideos(), []);
  const educations = useAsyncData<SafetyEducation[]>(loadEducations);
  const uncompleted = useAsyncData<SafetyEducation[]>(loadUncompleted);
  const inspectionGroups = useMemo(() => buildInspectionGroups(period), [period]);
  const inspectionTotal = useMemo(
    () => inspectionGroups.reduce((sum, group) => sum + group.totalCount, 0),
    [inspectionGroups],
  );
  const inspectionDone = useMemo(
    () => inspectionGroups.reduce((sum, group) => sum + group.completedCount, 0),
    [inspectionGroups],
  );

  useEffect(() => {
    if (!selected && educations.data?.length) {
      setSelected(educations.data[0]);
    }
  }, [educations.data, selected]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      await educations.reload();
      return;
    }
    const result = await safetyService.searchEducationList(keyword.trim(), false);
    educations.setData(result);
    setSelected(result[0] ?? null);
  };

  const handleOpenVideo = async () => {
    if (!selected?.videoUrl) {
      Alert.alert("영상 없음", "등록된 영상 주소가 없습니다.");
      return;
    }
    await Linking.openURL(selected.videoUrl);
  };

  const handleComplete = async () => {
    if (!selected) return;
    setCompleting(true);
    try {
      await safetyService.completeEducation(selected.id);
      await educations.reload();
      await uncompleted.reload();
      setSelected((prev) => (prev ? { ...prev, completed: true, progressRate: 100, status: "WATCHED" } : prev));
      Alert.alert("처리 완료", "영상 조회완료로 반영되었습니다.");
    } finally {
      setCompleting(false);
    }
  };

  return (
    <Screen contentStyle={styles.screenContent}>
      <View style={styles.modeTabs}>
        <TouchableOpacity style={[styles.modeTab, mode === "education" && styles.modeTabActive]} onPress={() => setMode("education")}>
          <Text style={[styles.modeText, mode === "education" && styles.modeTextActive]}>교육이수</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modeTab, mode === "inspection" && styles.modeTabActive]} onPress={() => setMode("inspection")}>
          <Text style={[styles.modeText, mode === "inspection" && styles.modeTextActive]}>안전점검</Text>
        </TouchableOpacity>
      </View>

      {mode === "education" ? (
        <>
          <AppCard style={styles.hero}>
            <Text style={styles.heroText}>이수 현황</Text>
            <Text style={styles.heroCount}>{educations.data?.filter((item) => item.completed).length ?? 0} / {educations.data?.length ?? 0}</Text>
            <View style={styles.heroTrack}>
              <View style={[styles.heroProgress, { width: `${educations.data?.length ? ((educations.data.filter((item) => item.completed).length / educations.data.length) * 100) : 0}%` }]} />
            </View>
          </AppCard>

          <AppCard style={styles.searchCard}>
            <AppInput label="교육 검색" value={keyword} onChangeText={setKeyword} placeholder="제목 또는 내용 검색" />
            <View style={styles.buttonRow}>
              <AppButton label="검색" onPress={handleSearch} style={styles.halfButton} />
              <AppButton label="전체" variant="secondary" onPress={async () => { setKeyword(""); await educations.reload(); }} style={styles.halfButton} />
            </View>
          </AppCard>

          <AppCard>
            <Text style={styles.sectionTitle}>미이수 영상</Text>
            {uncompleted.loading ? <LoadingState /> : null}
            {!uncompleted.loading && !uncompleted.data?.length ? <EmptyState title="미이수 영상이 없습니다." /> : null}
            {uncompleted.data?.map((item) => (
              <TouchableOpacity key={item.id} style={styles.uncompletedItem} onPress={() => setSelected(item)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.meta}>{item.durationMinutes}분 · {item.status === "WATCHING" ? "시청중" : "미시청"}</Text>
                </View>
                <StatusBadge label={item.status === "WATCHING" ? "시청중" : "미이수"} tone={item.status === "WATCHING" ? "orange" : "red"} />
              </TouchableOpacity>
            ))}
          </AppCard>

          {selected ? (
            <AppCard style={styles.detailCard}>
              <Text style={styles.sectionTitle}>교육 상세조회</Text>
              <Text style={styles.detailTitle}>{selected.title}</Text>
              <Text style={styles.detailText}>{selected.description || "상세 설명이 없습니다."}</Text>
              <Text style={styles.meta}>영상 주소: {selected.videoUrl || "-"}</Text>
              <Text style={styles.meta}>자료 주소: {selected.materialUrl || "-"}</Text>
              <Text style={styles.meta}>교육 시간: {selected.durationMinutes}분</Text>
              <View style={styles.buttonColumn}>
                <AppButton label="영상 조회" variant="secondary" onPress={handleOpenVideo} />
                {!selected.completed ? <AppButton label="영상 조회완료" onPress={handleComplete} loading={completing} /> : null}
              </View>
            </AppCard>
          ) : null}

          {educations.error ? <Text style={styles.error}>{educations.error}</Text> : null}
          {educations.loading ? <LoadingState /> : null}
          {!educations.loading && !educations.data?.length ? <EmptyState title="교육 목록이 없습니다." /> : null}
          {educations.data?.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => setSelected(item)}>
              <AppCard>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.meta}>{item.durationMinutes}분 · 마감 {item.deadline}</Text>
                  </View>
                  <StatusBadge label={item.completed ? "이수완료" : "진행중"} tone={item.completed ? "green" : "orange"} />
                </View>
                {!item.completed ? <AppButton label="상세보기" variant="secondary" onPress={() => setSelected(item)} /> : null}
              </AppCard>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <View style={styles.periodTabs}>
            {[
              { key: "day", label: "일 점검" },
              { key: "week", label: "주 점검" },
              { key: "month", label: "월 점검" },
            ].map((item) => (
              <TouchableOpacity key={item.key} style={[styles.periodTab, period === item.key && styles.periodTabActive]} onPress={() => setPeriod(item.key as "day" | "week" | "month")}>
                <Text style={[styles.periodText, period === item.key && styles.periodTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppCard style={styles.todayCard}>
            <View style={styles.todayHeader}>
              <Text style={styles.todayTitle}>오늘의 점검</Text>
              <Text style={styles.todayCount}>{inspectionDone}/{inspectionTotal}</Text>
            </View>
          </AppCard>

          {inspectionGroups.map((group) => (
            <AppCard key={group.title} style={styles.inspectionGroup}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <Text style={styles.groupCount}>{group.completedCount}/{group.totalCount}</Text>
              </View>
              {group.items.map((item) => (
                <View key={item.id} style={styles.checkRow}>
                  <View style={styles.checkBox} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.checkLabel}>{item.label}</Text>
                    {item.description ? <Text style={styles.checkMeta}>{item.description}</Text> : null}
                  </View>
                </View>
              ))}
            </AppCard>
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 14,
    paddingBottom: 42,
  },
  modeTabs: {
    flexDirection: "row",
    backgroundColor: "#EEF3F8",
    borderRadius: 18,
    padding: 4,
  },
  modeTab: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  modeTabActive: {
    backgroundColor: "#FFFFFF",
  },
  modeText: {
    color: theme.colors.subText,
    fontWeight: "800",
  },
  modeTextActive: {
    color: theme.colors.text,
  },
  hero: { backgroundColor: theme.colors.primary },
  heroText: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  heroCount: { color: "#FFFFFF", fontSize: 36, fontWeight: "900", marginTop: 10 },
  heroTrack: { marginTop: 16, height: 8, backgroundColor: "rgba(255,255,255,0.28)", borderRadius: 999, overflow: "hidden" },
  heroProgress: { height: "100%", backgroundColor: "#FFFFFF", borderRadius: 999 },
  searchCard: { gap: 12 },
  buttonRow: { flexDirection: "row", gap: 12 },
  halfButton: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: theme.colors.text, marginBottom: 10 },
  uncompletedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  detailCard: { gap: 10 },
  detailTitle: { fontSize: 22, fontWeight: "800", color: theme.colors.text },
  detailText: { color: theme.colors.text, lineHeight: 24 },
  buttonColumn: { gap: 10, marginTop: 4 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 10 },
  itemTitle: { fontSize: 18, fontWeight: "700", color: theme.colors.text },
  meta: { color: theme.colors.subText, marginTop: 4 },
  error: { color: theme.colors.danger },
  periodTabs: { flexDirection: "row", gap: 0, borderRadius: 16, overflow: "hidden" },
  periodTab: { flex: 1, backgroundColor: theme.colors.primary, paddingVertical: 14, alignItems: "center" },
  periodTabActive: { backgroundColor: "#FFFFFF" },
  periodText: { color: "#FFFFFF", fontWeight: "800" },
  periodTextActive: { color: theme.colors.accent },
  todayCard: { backgroundColor: "#DDEAF7", minHeight: 120, justifyContent: "center", borderRadius: 22 },
  todayHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  todayTitle: { fontSize: 24, fontWeight: "800", color: theme.colors.text },
  todayCount: { fontSize: 22, fontWeight: "900", color: theme.colors.primary },
  inspectionGroup: { gap: 10, borderRadius: 22 },
  groupHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  groupTitle: { fontSize: 18, fontWeight: "800", color: theme.colors.text },
  groupCount: { fontSize: 18, fontWeight: "900", color: theme.colors.accent },
  checkRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  checkBox: { width: 20, height: 20, borderRadius: 5, backgroundColor: "#E2E8F2", marginTop: 2 },
  checkLabel: { fontSize: 16, color: theme.colors.text, fontWeight: "600" },
  checkMeta: { color: theme.colors.subText, marginTop: 2, fontSize: 13 },
});
