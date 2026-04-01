"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ExpertCard } from "@/components/shared/expert-card";

const skillOptions = [
  "多维表格",
  "自动化",
  "API集成",
  "数据看板",
  "CRM系统",
  "系统集成",
  "模板定制",
  "培训",
];

const cityOptions = ["全部城市", "北京", "上海", "深圳", "杭州", "广州", "成都"];

const levelOptions = [
  { value: "all", label: "全部" },
  { value: "认证行家", label: "认证行家" },
  { value: "金牌行家", label: "金牌行家" },
  { value: "战略行家", label: "战略行家" },
];

interface Expert {
  id: string;
  name: string;
  avatar: string;
  level: string;
  city: string;
  years: number;
  intro: string;
  rating: string;
  reviewCount: number;
  caseCount: number;
  hourlyRate: number;
  skills: string[];
}

interface FiltersState {
  levels: string[];
  skills: string[];
  priceMin: string;
  priceMax: string;
  city: string;
  sort: string;
}

function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onReset: () => void;
}) {
  const handleLevelChange = (level: string, checked: boolean) => {
    if (level === "all") {
      onChange({ ...filters, levels: [] });
    } else {
      const newLevels = checked
        ? [...filters.levels, level]
        : filters.levels.filter((l) => l !== level);
      onChange({ ...filters, levels: newLevels });
    }
  };

  const handleSkillChange = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onChange({ ...filters, skills: newSkills });
  };

  return (
    <div className="space-y-6">
      {/* Level Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">认证等级</h3>
        <div className="space-y-2">
          {levelOptions.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`level-${opt.value}`}
                checked={
                  opt.value === "all"
                    ? filters.levels.length === 0
                    : filters.levels.includes(opt.label)
                }
                onCheckedChange={(checked) =>
                  handleLevelChange(opt.label, checked as boolean)
                }
              />
              <Label
                htmlFor={`level-${opt.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {opt.value === "all" ? "全部" : opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Skill Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">技能标签</h3>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillChange(skill)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filters.skills.includes(skill)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">价格范围</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="¥最低"
            value={filters.priceMin}
            onChange={(e) =>
              onChange({ ...filters, priceMin: e.target.value })
            }
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground">~</span>
          <Input
            type="number"
            placeholder="¥最高"
            value={filters.priceMax}
            onChange={(e) =>
              onChange({ ...filters, priceMax: e.target.value })
            }
            className="h-9 text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* City Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">所在城市</h3>
        <Select
          value={filters.city}
          onValueChange={(value) => onChange({ ...filters, city: value as string })}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cityOptions.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Reset */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-muted-foreground"
        onClick={onReset}
      >
        <X className="mr-1 h-3 w-3" /> 重置筛选
      </Button>
    </div>
  );
}

export default function ExpertSquarePage() {
  const [filters, setFilters] = useState<FiltersState>({
    levels: [],
    skills: [],
    priceMin: "",
    priceMax: "",
    city: "全部城市",
    sort: "rating",
  });
  const [experts, setExperts] = useState<Expert[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const resetFilters = () =>
    setFilters({
      levels: [],
      skills: [],
      priceMin: "",
      priceMax: "",
      city: "全部城市",
      sort: "rating",
    });

  useEffect(() => {
    async function fetchExperts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.levels.length === 1) {
          params.set("level", filters.levels[0]);
        }
        if (filters.city && filters.city !== "全部城市") {
          params.set("city", filters.city);
        }
        if (filters.skills.length > 0) {
          params.set("skill", filters.skills[0]);
        }
        if (filters.priceMin) {
          params.set("priceMin", filters.priceMin);
        }
        if (filters.priceMax) {
          params.set("priceMax", filters.priceMax);
        }
        params.set("sort", filters.sort);
        params.set("limit", pageSize.toString());
        params.set("offset", ((currentPage - 1) * pageSize).toString());

        const res = await fetch(`/api/experts?${params.toString()}`);
        const data = await res.json();
        setExperts(data.experts || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Failed to fetch experts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperts();
  }, [filters, currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-screen-xl px-4 py-3 lg:px-8">
          <p className="text-sm text-muted-foreground">
            首页 &gt; <span className="text-foreground">行家</span>
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl flex-1 px-4 py-8 lg:px-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 pr-8 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              筛选条件
            </h2>
            <FilterSidebar
              filters={filters}
              onChange={(f) => { setFilters(f); setCurrentPage(1); }}
              onReset={() => { resetFilters(); setCurrentPage(1); }}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">找行家</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                共{total}位行家
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-1 h-4 w-4" /> 筛选
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetHeader>
                    <SheetTitle>筛选条件</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      filters={filters}
                      onChange={(f) => { setFilters(f); setCurrentPage(1); }}
                      onReset={() => { resetFilters(); setCurrentPage(1); }}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select
                value={filters.sort}
                onValueChange={(value) => {
                  setFilters({ ...filters, sort: value || "rating" });
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-9 w-40 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">评分最高</SelectItem>
                  <SelectItem value="price-asc">价格从低到高</SelectItem>
                  <SelectItem value="price-desc">价格从高到低</SelectItem>
                  <SelectItem value="cases">案例最多</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expert Grid */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 animate-pulse bg-muted rounded-lg" />
              ))}
            </div>
          ) : experts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground">未找到符合条件的行家</p>
              <Button
                variant="link"
                onClick={() => { resetFilters(); setCurrentPage(1); }}
              >
                重置筛选条件
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {experts.map((expert) => (
                <ExpertCard
                  key={expert.id}
                  expert={{
                    id: expert.id,
                    name: expert.name,
                    avatar: expert.avatar || "",
                    level: expert.level as any,
                    rating: parseFloat(expert.rating) || 0,
                    reviewCount: expert.reviewCount || 0,
                    city: expert.city || "",
                    years: expert.years || 0,
                    skills: expert.skills || [],
                    hourlyRate: expert.hourlyRate || 0,
                    caseCount: expert.caseCount || 0,
                    intro: expert.intro || "",
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "secondary" : "outline"}
                    size="sm"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
