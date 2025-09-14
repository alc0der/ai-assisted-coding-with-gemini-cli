<script setup lang="ts">
import "survey-core/survey-core.css";
import { ref, onMounted } from "vue";
import { Model } from "survey-core";
import { SurveyComponent } from "survey-vue3-ui";

const survey = ref<Model | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Get configuration from environment variables
const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

// Load configuration on mount
onMounted(async () => {
  try {
    // Fetch survey data from local assets
    const response = await fetch("./data/survey.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch survey: ${response.status} ${response.statusText}`,
      );
    }

    const surveyJson = await response.json();

    // Create the survey model
    survey.value = new Model(surveyJson);

    // Add survey completion handler
    survey.value.onComplete.add(async (sender) => {
      await saveSurveyResults(sender.data);
    });

    loading.value = false;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    error.value = errorMessage;
    loading.value = false;
    console.error("Failed to load survey:", err);
  }
});

async function saveSurveyResults(surveyData: any) {
  try {
    // Get the Google Apps Script URL from environment
    const googleScriptUrl = GOOGLE_APPS_SCRIPT_URL;

    if (
      !googleScriptUrl ||
      googleScriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {
      alert(
        "Survey submission is not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in the .env file.",
      );
      return;
    }

    // Submit to Google Apps Script
    const requestBody = JSON.stringify(surveyData);

    await fetch(googleScriptUrl, {
      method: "POST",
      mode: "no-cors", // Google Apps Script doesn't support CORS preflight
      headers: {
        "Content-Type": "text/plain", // Use text/plain to avoid CORS preflight
      },
      body: requestBody,
    });
    alert(
      "Thank you for completing the survey! Your responses have been saved.",
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    alert(
      "Network error while submitting survey. Please check your connection and try again.",
    );
  }
}
</script>

<template>
  <div class="survey-container">
    <div v-if="loading" class="loading">Loading survey...</div>
    <div v-else-if="error" class="error">
      <div>{{ error }}</div>
      <div class="error-hint">Check the debug panel for more information</div>
    </div>
    <SurveyComponent v-else-if="survey" :model="survey" />
  </div>
</template>

<style scoped>
.survey-container {
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2em;
}

.error {
  color: #d32f2f;
}

.error-hint {
  margin-top: 10px;
  font-size: 0.9em;
  color: #666;
}
</style>
