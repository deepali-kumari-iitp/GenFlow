import {
  ArrowLeft,
  Bell,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Lock,
  Mail,
  Save,
  ShieldCheck,
  User,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";

const PROFILE_NAME_KEY = "genflow-profile-name";
const PROFILE_IMAGE_KEY = "genflow-profile-image";

function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profileName, setProfileName] = useState("Deepali");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draftName, setDraftName] = useState("Deepali");
  const [draftImage, setDraftImage] = useState<string | null>(null);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [executionNotifications, setExecutionNotifications] =
    useState(true);

  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem(PROFILE_NAME_KEY);
    const savedImage = localStorage.getItem(PROFILE_IMAGE_KEY);

    if (savedName) {
      setProfileName(savedName);
      setDraftName(savedName);
    }

    if (savedImage) {
      setProfileImage(savedImage);
      setDraftImage(savedImage);
    }
  }, []);

  const openProfileEditor = () => {
    setDraftName(profileName);
    setDraftImage(profileImage);
    setIsEditingProfile(true);
    setSaveMessage("");
  };

  const closeProfileEditor = () => {
    setDraftName(profileName);
    setDraftImage(profileImage);
    setIsEditingProfile(false);
    setSaveMessage("");
  };

  const handleProfileImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Image should be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDraftImage(reader.result);
        setSaveMessage("");
      }
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const cleanName = draftName.trim();

    if (!cleanName) {
      setSaveMessage("Please enter your name.");
      return;
    }

    setProfileName(cleanName);
    setProfileImage(draftImage);

    localStorage.setItem(PROFILE_NAME_KEY, cleanName);

    if (draftImage) {
      localStorage.setItem(PROFILE_IMAGE_KEY, draftImage);
    } else {
      localStorage.removeItem(PROFILE_IMAGE_KEY);
    }

    setIsEditingProfile(false);
    setSaveMessage("Profile updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  };

  const removeProfileImage = () => {
    setDraftImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const profileInitial = profileName
    .trim()
    .charAt(0)
    .toUpperCase() || "D";

  const draftInitial = draftName
    .trim()
    .charAt(0)
    .toUpperCase() || "D";

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <header className="flex min-h-16 items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <p className="text-xs text-zinc-500">
              Workspace
            </p>

            <h1 className="text-sm font-medium sm:text-base">
              Settings
            </h1>
          </div>
        </div>

        {saveMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-400">
            <Check size={14} />
            {saveMessage}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <User size={16} />
            </div>

            <h2 className="text-xl font-semibold sm:text-2xl">
              Workspace Settings
            </h2>
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your GenFlow profile, preferences and workspace
            behavior.
          </p>
        </div>

        {/* Profile */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-medium">
                Profile
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Manage your personal workspace identity.
              </p>
            </div>

            {!isEditingProfile && (
              <button
                type="button"
                onClick={openProfileEditor}
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-violet-400/30 hover:bg-violet-500/5 hover:text-white"
              >
                Edit Profile
              </button>
            )}
          </div>

          {!isEditingProfile ? (
            <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:px-6">
              {/* Avatar */}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-xl font-semibold text-violet-300 ring-1 ring-violet-400/20">
                  {profileInitial}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-lg font-medium">
                  {profileName}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  GenFlow Workspace
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 text-[11px] text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Workspace Member
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <ShieldCheck size={14} />
                Profile secured
              </div>
            </div>
          ) : (
            <div className="px-5 py-6 sm:px-6">
              <div className="flex flex-col gap-7 lg:flex-row">
                {/* Avatar editor */}
                <div className="flex flex-col items-center lg:w-48">
                  <div className="relative">
                    {draftImage ? (
                      <img
                        src={draftImage}
                        alt="Profile preview"
                        className="h-28 w-28 rounded-3xl object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-violet-500/15 text-3xl font-semibold text-violet-300 ring-1 ring-violet-400/20">
                        {draftInitial}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111116] text-zinc-300 shadow-xl transition hover:bg-violet-500 hover:text-white"
                      aria-label="Upload profile photo"
                    >
                      <Camera size={17} />
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 text-xs font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Upload photo
                  </button>

                  {draftImage && (
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      className="mt-2 text-xs text-zinc-600 transition hover:text-red-400"
                    >
                      Remove photo
                    </button>
                  )}

                  <p className="mt-3 text-center text-[10px] leading-4 text-zinc-600">
                    PNG, JPG or WEBP
                    <br />
                    Maximum 5 MB
                  </p>
                </div>

                {/* Profile form */}
                <div className="flex-1">
                  <label className="block">
                    <span className="text-xs font-medium text-zinc-400">
                      Display name
                    </span>

                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3">
                      <User
                        size={16}
                        className="text-zinc-600"
                      />

                      <input
                        value={draftName}
                        onChange={(event) =>
                          setDraftName(event.target.value)
                        }
                        placeholder="Enter your name"
                        className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-700"
                      />
                    </div>
                  </label>

                  <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        size={16}
                        className="mt-0.5 text-zinc-600"
                      />

                      <div>
                        <p className="text-xs font-medium text-zinc-400">
                          Workspace email
                        </p>

                        <p className="mt-1 text-sm text-zinc-600">
                          Your GenFlow workspace account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeProfileEditor}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <X size={14} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveProfile}
                      className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-violet-500"
                    >
                      <Save size={14} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Preferences */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
            <p className="text-sm font-medium">
              Preferences
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Configure how GenFlow behaves.
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {/* Notifications */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Bell size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Notifications
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Receive important workflow and execution updates.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications((value) => !value)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  emailNotifications
                    ? "bg-violet-600"
                    : "bg-zinc-800"
                }`}
                aria-label="Toggle notifications"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Execution notifications */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Clock3 size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Execution Alerts
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Get notified when workflow runs fail.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setExecutionNotifications((value) => !value)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  executionNotifications
                    ? "bg-violet-600"
                    : "bg-zinc-800"
                }`}
                aria-label="Toggle execution alerts"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    executionNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Auto save */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Save size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Auto Save
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Automatically preserve workflow changes.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setAutoSave((value) => !value)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  autoSave
                    ? "bg-violet-600"
                    : "bg-zinc-800"
                }`}
                aria-label="Toggle auto save"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    autoSave ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Compact mode */}
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <Workflow size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Compact Workflow View
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Use a more compact layout inside the workflow builder.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCompactMode((value) => !value)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  compactMode
                    ? "bg-violet-600"
                    : "bg-zinc-800"
                }`}
                aria-label="Toggle compact mode"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    compactMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                <Lock size={16} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Security
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Workspace security status.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-white/[0.05] sm:grid-cols-2">
            <div className="bg-[#07070a] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <ShieldCheck size={14} />
                Workspace Protected
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-600">
                Your local GenFlow workspace is currently protected.
              </p>
            </div>

            <div className="bg-[#07070a] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                <Lock size={14} />
                Access Control
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-600">
                Workspace access settings are available for future
                authentication integration.
              </p>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <CircleHelp size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                Need help?
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Learn more about building and running GenFlow workflows.
              </p>
            </div>

            <ChevronRight
              size={17}
              className="text-zinc-600"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default SettingsPage;