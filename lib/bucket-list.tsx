"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

export type Entry = {
  status: "saved" | "completed";
  savedAt: number;
  completedAt?: number;
};

type Entries = Record<string, Entry>;

const STORAGE_KEY = "madison-bucket-list:v1";
const EMPTY: Entries = {};

// --- localStorage-backed external store -----------------------------------

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedEntries: Entries = EMPTY;

function readEntries(): Entries {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedEntries;
  }
  if (raw === cachedRaw) return cachedEntries;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    cachedEntries =
      parsed && typeof parsed === "object" ? (parsed as Entries) : EMPTY;
  } catch {
    cachedEntries = EMPTY;
  }
  return cachedEntries;
}

function writeEntries(next: Entries) {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedEntries = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Storage unavailable (private mode, quota). Keep in-memory state.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// --- Context ----------------------------------------------------------------

type Toast = { id: number; message: string; showLink: boolean };

type BucketListContextValue = {
  entries: Entries;
  /** False during SSR and the first client render, before storage is read. */
  hydrated: boolean;
  statusOf: (id: string) => Entry["status"] | undefined;
  save: (id: string, name: string) => void;
  remove: (id: string) => void;
  toggleSaved: (id: string, name: string) => void;
  complete: (id: string) => void;
  uncomplete: (id: string) => void;
  savedCount: number;
  completedCount: number;
};

const BucketListContext = createContext<BucketListContextValue | null>(null);

export function useBucketList() {
  const ctx = useContext(BucketListContext);
  if (!ctx) throw new Error("useBucketList must be used inside BucketListProvider");
  return ctx;
}

const noopSubscribe = () => () => {};

export function BucketListProvider({ children }: { children: ReactNode }) {
  const entries = useSyncExternalStore(subscribe, readEntries, () => EMPTY);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [toast, setToast] = useState<Toast | null>(null);
  const toastId = useRef(0);

  const showToast = useCallback((message: string, showLink = true) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message, showLink });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const update = useCallback((fn: (prev: Entries) => Entries) => {
    writeEntries(fn(readEntries()));
  }, []);

  const save = useCallback(
    (id: string, name: string) => {
      update((prev) =>
        prev[id] ? prev : { ...prev, [id]: { status: "saved", savedAt: Date.now() } },
      );
      showToast(`${name} saved to your list`);
    },
    [update, showToast],
  );

  const remove = useCallback(
    (id: string) => {
      update((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [update],
  );

  const toggleSaved = useCallback(
    (id: string, name: string) => {
      if (readEntries()[id]) {
        remove(id);
        showToast(`${name} removed from your list`, false);
      } else {
        save(id, name);
      }
    },
    [remove, save, showToast],
  );

  const complete = useCallback(
    (id: string) => {
      const now = Date.now();
      update((prev) => ({
        ...prev,
        [id]: { status: "completed", savedAt: prev[id]?.savedAt ?? now, completedAt: now },
      }));
    },
    [update],
  );

  const uncomplete = useCallback(
    (id: string) => {
      update((prev) =>
        prev[id]
          ? { ...prev, [id]: { status: "saved", savedAt: prev[id].savedAt } }
          : prev,
      );
    },
    [update],
  );

  const value = useMemo<BucketListContextValue>(() => {
    const all = Object.values(entries);
    return {
      entries,
      hydrated,
      statusOf: (id) => entries[id]?.status,
      save,
      remove,
      toggleSaved,
      complete,
      uncomplete,
      savedCount: all.filter((e) => e.status === "saved").length,
      completedCount: all.filter((e) => e.status === "completed").length,
    };
  }, [entries, hydrated, save, remove, toggleSaved, complete, uncomplete]);

  return (
    <BucketListContext.Provider value={value}>
      {children}
      <ToastView toast={toast} onDismiss={dismissToast} />
    </BucketListContext.Provider>
  );
}

function ToastView({ toast, onDismiss }: { toast: Toast | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(onDismiss, 4000);
    return () => window.clearTimeout(t);
  }, [toast, onDismiss]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center sm:inset-x-auto sm:right-8 sm:bottom-8"
    >
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-toast-in items-center gap-7 rounded-[10px] bg-ink px-5 py-4 text-white shadow-toast"
        >
          <p className="font-medium">{toast.message}</p>
          <div className="flex items-center gap-3">
            {toast.showLink && (
              <Link
                href="/my-list"
                onClick={onDismiss}
                className="font-semibold whitespace-nowrap text-[#a5d8ff] hover:underline"
              >
                View list
              </Link>
            )}
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="rounded p-0.5 text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
