import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, CheckCircle, X, AlertCircle } from "lucide-react";
import type {
  SelectedLender,
  DocumentUpload,
  StudentProfile,
} from "@/types/studentLoanType";
import { DOCUMENT_REQUIREMENTS } from "@/data/mockData";
import { formatFileSize } from "@/lib/helper/studentLoanHelper";

interface DocumentationStageProps {
  lender: SelectedLender;
  profile: StudentProfile;
  onComplete: (documents: DocumentUpload[]) => void;
}

export default function DocumentationStage({
  lender,
  profile,
  onComplete,
}: DocumentationStageProps) {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, requirementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], requirementId);
    }
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    requirementId: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], requirementId);
    }
  };

  const handleFileUpload = (file: File, requirementId: string) => {
    const newUpload: DocumentUpload = {
      id: `upload-${Date.now()}`,
      requirementId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      status: "uploaded",
    };

    setUploads((prev) => {
      const filtered = prev.filter((u) => u.requirementId !== requirementId);
      return [...filtered, newUpload];
    });

    // Simulate verification
    setTimeout(() => {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === newUpload.id ? { ...u, status: "verified" as const } : u
        )
      );
    }, 2000);
  };

  const handleRemove = (uploadId: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== uploadId));
  };

  const getUploadForRequirement = (requirementId: string) => {
    return uploads.find((u) => u.requirementId === requirementId);
  };

  const relevantDocs = DOCUMENT_REQUIREMENTS.filter((doc) => {
    if (!profile.coApplicantAvailable && doc.category === "co-applicant") {
      return false;
    }
    return true;
  });

  const requiredDocs = relevantDocs.filter((doc) => doc.required);
  const uploadedRequiredDocs = requiredDocs.filter((doc) =>
    uploads.some((u) => u.requirementId === doc.id)
  );
  const progress = (uploadedRequiredDocs.length / requiredDocs.length) * 100;
  const canProceed = uploadedRequiredDocs.length === requiredDocs.length;

  const studentDocs = relevantDocs.filter((doc) => doc.category === "student");
  const coApplicantDocs = relevantDocs.filter(
    (doc) => doc.category === "co-applicant"
  );

  return (
    <div className="container mx-auto px-4 max-w-5xl space-y-6">
      {/* Header */}
      <motion.div
        className="text-left lg:text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Upload Your Documents
        </h2>
        <p className="text-muted-foreground">
          Submit required documents to proceed with your loan application
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Upload Progress</h3>
          <span className="text-sm font-medium text-muted-foreground">
            {uploadedRequiredDocs.length} of {requiredDocs.length} required
            documents
          </span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Student Documents */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📚</span>
          <h3 className="text-xl font-semibold text-foreground">
            Student Documents
          </h3>
        </div>

        <div className="space-y-4">
          {studentDocs.map((doc, index) => {
            const upload = getUploadForRequirement(doc.id);

            return (
              <motion.div
                key={doc.id}
                className="border-2 border-border rounded-xl p-4 transition-all duration-200 hover:border-primary/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {doc.name}
                      </h4>
                      {doc.required && (
                        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Formats: {doc.formats.join(", ").toUpperCase()} • Max:{" "}
                      {formatFileSize(doc.maxSize)}
                    </p>
                  </div>

                  {upload && (
                    <div className="ml-4">
                      {upload.status === "verified" ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle className="w-6 h-6 text-success" />
                        </motion.div>
                      ) : upload.status === "uploaded" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full" />
                        </motion.div>
                      ) : (
                        <AlertCircle className="w-6 h-6 text-warning" />
                      )}
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {upload ? (
                    <motion.div
                      className="bg-secondary/50 rounded-lg p-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <File className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {upload.fileName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(upload.fileSize)} •{" "}
                              {upload.status === "verified"
                                ? "Verified"
                                : "Processing..."}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => handleRemove(upload.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`
                        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
                        ${
                          dragActive
                            ? "border-primary bg-primary/10 scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }
                      `}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => handleDrop(e, doc.id)}
                      onClick={() =>
                        document.getElementById(`file-${doc.id}`)?.click()
                      }
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={{ y: dragActive ? -10 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="text-sm text-foreground mb-1">
                        <span className="font-semibold text-primary">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <input
                        id={`file-${doc.id}`}
                        type="file"
                        className="hidden"
                        accept={doc.formats.map((f) => `.${f}`).join(",")}
                        onChange={(e) => handleFileInput(e, doc.id)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Co-Applicant Documents */}
      {profile.coApplicantAvailable && coApplicantDocs.length > 0 && (
        <motion.div
          className="glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">👨‍👩‍👦</span>
            <h3 className="text-xl font-semibold text-foreground">
              Co-Applicant Documents
            </h3>
          </div>

          <div className="space-y-4">
            {coApplicantDocs.map((doc, index) => {
              const upload = getUploadForRequirement(doc.id);

              return (
                <motion.div
                  key={doc.id}
                  className="border-2 border-border rounded-xl p-4 transition-all duration-200 hover:border-primary/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  {/* Same structure as student docs */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {doc.name}
                        </h4>
                        {doc.required && (
                          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {upload ? (
                      <motion.div
                        className="bg-secondary/50 rounded-lg p-3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <File className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {upload.fileName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(upload.fileSize)}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleRemove(upload.id)}
                            className="p-2 hover:bg-destructive/10 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-8 text-center cursor-pointer"
                        onDrop={(e) => handleDrop(e, doc.id)}
                        onClick={() =>
                          document.getElementById(`file-${doc.id}`)?.click()
                        }
                        whileHover={{ scale: 1.01 }}
                      >
                        <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="text-sm">
                          <span className="font-semibold text-primary">
                            Click to upload
                          </span>
                        </p>
                        <input
                          id={`file-${doc.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileInput(e, doc.id)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* No Co-Applicant Info */}
      {!profile.coApplicantAvailable && (
        <motion.div
          className="glass-card p-6 rounded-2xl bg-primary/5 border-2 border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Co-Applicant Documents Not Required
              </h4>
              <p className="text-sm text-muted-foreground">
                Since you don't have a co-applicant, only student documents are
                required for your application.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => onComplete(uploads)}
          disabled={!canProceed}
          className={`
            relative px-12 py-4 text-lg font-semibold rounded-xl overflow-hidden
            ${
              canProceed
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }
          `}
          whileHover={canProceed ? { scale: 1.02, y: -2 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
        >
          {canProceed && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          )}
          <span className="relative z-10">
            {canProceed
              ? "Submit Application"
              : `Upload ${
                  requiredDocs.length - uploadedRequiredDocs.length
                } More Required Documents`}
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
