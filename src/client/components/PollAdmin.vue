<template>
  <form @submit.prevent class="poll-admin-container">
    <div class="poll-admin">
      <div class="poll-setting">
        <h2>투표 설정</h2>
        <div class="expiry-option">
          <v-switch
            label="투표 기한 적용"
            v-model="createPoll.hasExpiry"
            dense
            inset
            class="toggle-box"
          ></v-switch>
          <input
            v-model="createPoll.closeAt"
            class="date-box"
            v-if="createPoll.hasExpiry"
            type="date"
          />
        </div>
        <div class="results-option">
          <v-switch
            label="결과 공개"
            v-model="createPoll.isPublic"
            dense
            inset
            class="toggle-box"
          ></v-switch>
        </div>
      </div>
      <PollPage
        v-for="(page, index) in createPoll.pages"
        :key="index"
        :pollPage="page"
      />
      <FinalButton
        :isAdmin="true"
        :readyToCreate="readyToCreate"
        @sendPollData="sendPollData"
        :finalButtonText="`투표생성`"
      />
    </div>
  </form>
</template>
<script>
// TODO: apiEndpoint, userKey를 prop으로 받을 수 있게하기
// TODO: poll-created, failed-to-create-poll 2개의 event를 문서에서 명시해주기
import { ADMIN_POLL_API, USER_KEY } from "../config";
import PollPage from "./AdminView/PollPage";
import FinalButton from "./FinalButton";

const axios = require("axios");

export default {
  name: "PollAdmin",
  components: {
    PollPage,
    FinalButton,
  },
  data() {
    return {
      createPoll: {
        hasExpiry: false,
        closeAt: "",
        isPublic: true,
        pages: [
          {
            title: "",
            description: "",
            elements: [
              {
                type: "checkbox",
                title: "",
                description: "",
                isRequired: true,
                multipleSelectOption: {
                  allowed: false,
                },
                choices: [],
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    readyToCreate() {
      const titlesAreValid = this.createPoll.pages.every((page) => {
        return page.elements.every((element) => {
          return element.title !== "";
        });
      });

      const choicesAreValid = this.createPoll.pages.every((page) => {
        return page.elements.every((element) => {
          return element.choices.length >= 2;
        });
      });

      return titlesAreValid && choicesAreValid;
    },
  },
  methods: {
    checkReadyToCreate() {
      let pollInfo = this.createPoll.pages;
      for (let i = 0; i < pollInfo.length, i++; ) {
        for (let j = 0; j < pollInfo[i].elements.length, j++; ) {
          let required = pollInfo[i].elements[j];
          if (
            required.title !== "" &&
            required.rateMax !== "" &&
            required.choices.length >= 2
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    sendPollData() {
      const headers = {
        Authorization: USER_KEY,
      };

      axios
        .post(ADMIN_POLL_API, this.createPoll, {
          headers: headers,
        })
        .then(() => {
          this.$emit("poll-created", this.createPoll);
        })
        .catch(() => {
          this.$emit("failed-to-create-poll");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.poll-admin-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 10px;
  h2 {
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #d8d8d8;
  }

  .poll-setting {
    margin-bottom: 25px;
  }

  .poll-types {
    .type-checkbox {
      display: flex;
    }
    .checkbox {
      margin-right: 20px;
    }
  }

  .expiry-option {
    display: flex;
    align-items: baseline;
    .date-box {
      margin-left: 20px;
      width: 150px;
    }
  }
}
</style>
