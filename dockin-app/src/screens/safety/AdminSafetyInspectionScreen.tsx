import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/src/components/common/Screen";
import { AppCard } from "@/src/components/common/AppCard";
import { AppButton } from "@/src/components/common/AppButton";
import { AppInput } from "@/src/components/common/AppInput";
import { EmptyState } from "@/src/components/common/EmptyState";
import { LoadingState } from "@/src/components/common/LoadingState";
import { useAsyncData } from "@/src/hooks/useAsyncData";
import { safetyService } from "@/src/services/safetyService";
import { theme } from "@/src/theme/theme";

export function AdminSafetyInspectionScreen() {
  const [month] = useState("2025-11");
  const [viewTab, setViewTab] = useState<"all" | "unsigned">("all");
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("15");

  const summary = useAsyncData(useCallback(() => safetyService.getInspectionSummary(month), [month]));
  const workers = useAsyncData(useCallback(() => safetyService.getWorkerProgress(month), [month]));
  const courses = useAsyncData(useCallback(() => safetyService.getAdminEducationList(), []));

  const shownWorkers = useMemo(() => {
    const items = workers.data ?? [];
    return viewTab === "unsigned" ? items.filter((item) => !item.completed) : items;
  }, [viewTab, workers.data]);

  const handleSelectCourse = (item: any) => {
    setSelectedId(item.id);
    setTitle(item.title);
    setDescription(item.description ?? "");
    setVideoUrl(item.videoUrl ?? "");
    setMaterialUrl(item.materialUrl ?? "");
    setDurationMinutes(String(item.durationMinutes ?? 15));
  };

  const resetForm = () => {
    setSelectedId(null);
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setMaterialUrl("");
    setDurationMinutes("15");
  };

  const handleSearch = async () => {
    if (!keyword.trim()) {
      await courses.reload();
      return;
    }
    courses.setData(await safetyService.searchEducationList(keyword.trim(), true));
  };

  const handleSave = async () => {
    const payload = {
      title: title.trim(),
      description: description.trim(),
      videoUrl: videoUrl.trim(),
      materialUrl: materialUrl.trim() || undefined,
      durationMinutes: Number.parseInt(durationMinutes, 10) || 0,
    };
    if (selectedId) {
      await safetyService.updateEducation(selectedId, payload);
    } else {
      await safetyService.createEducation(payload);
    }
    resetForm();
    await courses.reload();
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await safetyService.deleteEducation(selectedId);
    resetForm();
    await courses.reload();
  };

  return (
    <Screen contentStyle={styles.screenContent}>
      <AppCard style={styles.monthCard}>
        <Text style={styles.monthLabel}>조회 월 선택</Text>
        <View style={styles.monthField}>
          <Text style={styles.monthValue}>{month}</Text>
        </View>
      </AppCard>

      {summary.loading ? <LoadingState /> : null}
      {summary.data ? (
        <>
          <View style={styles.grid}>
            <AppCard style={styles.tile}>
              <View style={[styles.dot, { backgroundColor: "#D9E9FF" }]} />
              <Text style={styles.tileLabel}>전체 근무자</Text>
              <Text style={styles.tileValue}>{summary.data.totalWorkers}명</Text>
            </AppCard>
            <AppCard style={styles.tile}>
              <View style={[styles.dot, { backgroundColor: "#D7F9DB" }]} />
              <Text style={styles.tileLabel}>이수완료</Text>
              <Text style={styles.tileValue}>{summary.data.completedWorkers}명</Text>
            </AppCard>
            <AppCard style={styles.tile}>
              <View style={[styles.dot, { backgroundColor: "#FFF6BF" }]} />
              <Text style={styles.tileLabel}>미이수</Text>
              <Text style={styles.tileValue}>{summary.data.incompleteWorkers}명</Text>
            </AppCard>
            <AppCard style={styles.tile}>
              <View style={[styles.dot, { backgroundColor: "#FFE0EA" }]} />
              <Text style={styles.tileLabel}>미서명</Text>
              <Text style={styles.tileValue}>{summary.data.unsignedWorkers}명</Text>
            </AppCard>
          </View>

          <View style={styles.segmentWrap}>
            <TouchableOpacity style={[styles.segmentButton, viewTab === "all" && styles.segmentActive]} onPress={() => setViewTab("all")}>
              <Text style={[styles.segmentText, viewTab === "all" && styles.segmentTextActive]}>전체현황</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.segmentButton, viewTab === "unsigned" && styles.segmentActive]} onPress={() => setViewTab("unsigned")}>
              <Text style={[styles.segmentText, viewTab === "unsigned" && styles.segmentTextActive]}>미서명 근로자</Text>
            </TouchableOpacity>
          </View>

          <AppCard style={styles.workerCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>근로자 이수현황</Text>
              <View style={styles.countPill}><Text style={styles.countPillText}>{shownWorkers.length}명</Text></View>
            </View>
            {shownWorkers.map((item) => {
              const progress = item.totalCount > 0 ? item.completedCount / item.totalCount : 0;
              return (
                <View key={item.workerId} style={styles.workerRow}>
                  <View style={styles.workerAvatar}>
                    <Text style={styles.workerAvatarText}>{item.workerName.slice(0, 1)}</Text>
                  </View>
                  <View style={styles.workerContent}>
                    <View style={styles.workerTop}>
                      <View>
                        <Text style={styles.workerName}>{item.workerName}</Text>
                        <Text style={styles.workerMeta}>{item.teamName}</Text>
                      </View>
                      <View style={[styles.statusPill, item.completed ? styles.statusDone : styles.statusPending]}>
                        <Text style={styles.statusPillText}>{item.completed ? "완료" : "미이수"}</Text>
                      </View>
                    </View>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressValue, { width: `${Math.max(progress * 100, 15)}%`, backgroundColor: item.completed ? "#24C25A" : "#F44336" }]} />
                    </View>
                  </View>
                </View>
              );
            })}
            {!shownWorkers.length ? <EmptyState title="조회할 근로자가 없습니다." /> : null}
          </AppCard>
        </>
      ) : null}

      <AppCard style={styles.manageCard}>
        <Text style={styles.sectionTitle}>교육자료 관리</Text>
        <AppInput label="교육자료 검색" value={keyword} onChangeText={setKeyword} placeholder="제목 또는 내용 검색" />
        <View style={styles.actionRow}>
          <AppButton label="검색" onPress={handleSearch} style={styles.flexButton} />
          <AppButton label="초기화" variant="secondary" onPress={async () => { setKeyword(""); resetForm(); await courses.reload(); }} style={styles.flexButton} />
        </View>
        <AppInput label="제목" value={title} onChangeText={setTitle} placeholder="교육 제목" />
        <AppInput label="설명" value={description} onChangeText={setDescription} placeholder="교육 상세 설명" multiline />
        <AppInput label="영상 URL" value={videoUrl} onChangeText={setVideoUrl} placeholder="https://..." />
        <AppInput label="자료 URL" value={materialUrl} onChangeText={setMaterialUrl} placeholder="선택 입력" />
        <AppInput label="교육 시간(분)" value={durationMinutes} onChangeText={setDurationMinutes} placeholder="30" keyboardType="numeric" />
        <View style={styles.actionRow}>
          <AppButton label={selectedId ? "수정 저장" : "등록"} onPress={handleSave} style={styles.flexButton} />
          <AppButton label="삭제" variant="danger" onPress={handleDelete} style={styles.flexButton} />
        </View>
        {courses.loading ? <LoadingState /> : null}
        {courses.data?.map((item) => (
          <TouchableOpacity key={item.id} style={styles.courseItem} onPress={() => handleSelectCourse(item)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.workerName}>{item.title}</Text>
              <Text style={styles.workerMeta}>{item.description || "설명 없음"}</Text>
            </View>
            <Text style={styles.courseSelect}>{selectedId === item.id ? "선택됨" : "선택"}</Text>
          </TouchableOpacity>
        ))}
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 14,
    paddingBottom: 42,
  },
  monthCard: { gap: 10, borderRadius: 22 },
  monthLabel: { fontSize: 18, fontWeight: "700", color: theme.colors.text },
  monthField: { backgroundColor: "#F3F4FA", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14 },
  monthValue: { color: "#8E95A3", fontSize: 18 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  tile: { width: "47%", minHeight: 132, borderRadius: 20 },
  dot: { width: 30, height: 30, borderRadius: 15, marginBottom: 12 },
  tileLabel: { color: theme.colors.text, fontSize: 16, fontWeight: "600" },
  tileValue: { fontSize: 24, fontWeight: "900", color: theme.colors.text, marginTop: 16 },
  segmentWrap: { flexDirection: "row", gap: 10 },
  segmentButton: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 12, paddingVertical: 12, alignItems: "center", minHeight: 52 },
  segmentActive: { backgroundColor: "#5D5D5D" },
  segmentText: { color: theme.colors.text, fontWeight: "800", fontSize: 16 },
  segmentTextActive: { color: "#FFFFFF" },
  workerCard: { borderRadius: 22 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: theme.colors.text },
  countPill: { backgroundColor: "#ECECEC", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  countPillText: { color: "#6E6E6E", fontWeight: "700" },
  workerRow: { flexDirection: "row", gap: 12, paddingVertical: 12, alignItems: "center" },
  workerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#CDE3FF", alignItems: "center", justifyContent: "center" },
  workerAvatarText: { color: theme.colors.primary, fontWeight: "900", fontSize: 18 },
  workerContent: { flex: 1, gap: 8 },
  workerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  workerName: { fontSize: 18, fontWeight: "800", color: theme.colors.text },
  workerMeta: { color: theme.colors.subText, marginTop: 2 },
  progressTrack: { height: 6, backgroundColor: "#E6E8EE", borderRadius: 999, overflow: "hidden", marginRight: 8 },
  progressValue: { height: "100%", borderRadius: 999 },
  statusPill: { borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  statusDone: { backgroundColor: "#24C25A" },
  statusPending: { backgroundColor: "#F44336" },
  statusPillText: { color: "#FFFFFF", fontWeight: "800" },
  manageCard: { gap: 12, borderRadius: 22 },
  actionRow: { flexDirection: "row", gap: 10 },
  flexButton: { flex: 1 },
  courseItem: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F7FAFE",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  courseSelect: { color: theme.colors.primary, fontWeight: "800" },
});
