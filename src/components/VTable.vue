<template>
  <div class="v-table-container">
    <table v-if="showDesktopVersion" class="v-table">
      <thead :class="showMenu ? 'opened' : 'closed'">
        <tr>
          <th><div class="th__cnpj">CNPJ</div></th>
          <th><div class="th__legal-name">Legal name</div></th>
          <th><div class="th__address">Address</div></th>
          <th><div class="th__status">Status</div></th>
        </tr>
      </thead>
      <tbody :class="showMenu ? 'opened' : 'closed'">
        <tr
          v-for="org in organisations"
          :key="org.organisationID"
          @click="openDetails(org)"
        >
          <td>
            <div class="td__cnpj">
              {{ org.organisationCnpj }}
            </div>
          </td>
          <td>
            <div class="td__legal-name">
              {{ org.legalEntityName }}
            </div>
          </td>
          <td>
            <div class="td__address">
              {{ capitalizeSentence(`${org.address} - ${org.city}`) }}
            </div>
          </td>
          <td class="td__status">
            <div>
              <fa-icon
                v-if="org.status === 'Active'"
                icon="circle-check"
                class="td__status--success"
              />
              <fa-icon v-else icon="circle-xmark" class="td__status--error" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="v-list">
      <div
        class="v-list__item"
        v-for="org in organisations"
        :key="org.organisationID"
        :class="org.status === 'Active' ? 'active' : 'inactive'"
        @click="openDetails(org)"
      >
        <div class="v-list__item-bundle">
          <p class="v-list__item-bundle--title">CNPJ</p>
          <p class="v-list__item-bundle--value">
            {{ org.organisationCnpj }}
          </p>
        </div>
        <div class="v-list__item-bundle">
          <p class="v-list__item-bundle--title">Legal Name</p>
          <p class="v-list__item-bundle--value">
            {{ org.legalEntityName }}
          </p>
        </div>
        <div class="v-list__item-bundle--status">
          <p :class="org.status === 'Active' ? 'active' : 'inactive'">
            {{ org.status }}
          </p>
        </div>
      </div>
    </div>

    <div class="v-table-actions">
      <VButton
        v-if="canShowLess"
        type="secondary"
        title="Show less"
        @click="$emit('showLess')"
      />
      <VButton
        v-if="canShowMore"
        title="Show more"
        @click="$emit('showMore')"
      />
    </div>
  </div>
</template>

<script>
import { capitalizeSentence } from '@/utils/StringUtils.js'
import mediaQueryMixin from '../mixins/mediaQuery.mixin'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'VTable',

  components: {
    VButton: () => import('@/components/VButton.vue'),
  },

  mixins: [mediaQueryMixin],

  props: {
    organisations: {
      type: Array,
      required: true,
    },
    canShowMore: Boolean,
    canShowLess: Boolean,
  },

  data() {
    return {}
  },

  computed: {
    ...mapState(['showMenu']),

    showDesktopVersion() {
      return (
        this.extraLargeScreenAndUp || (this.largeScreenAndUp && !this.showMenu)
      )
    },
  },

  mounted() {
    this.updateDetailedOrganisation({})
  },

  methods: {
    capitalizeSentence,
    ...mapMutations(['updateDetailedOrganisation']),

    openDetails(org) {
      this.updateDetailedOrganisation(org)
      this.$router.push({ name: 'details' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
$opened-menu-offset: 460px;
$closed-menu-offset: 160px;

.v-table-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  .v-table {
    background-color: #fff;
    box-shadow: 4px 4px 16px 0px rgba(60, 74, 117, 0.54);
    padding: 2rem;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    thead {
      color: $dark-text-color;
      font-weight: 900 !important;
      font-size: 16px;
      border-bottom: 1.4px solid;

      th {
        padding: 1.5rem 0.5rem 0.5rem 0.5rem;
      }
      .th__cnpj,
      .th__legal-name,
      .th__address,
      .th__status {
        font-size: 16px;
        font-weight: 900;
        text-align: center;
      }
    }

    tbody {
      color: $neutral-text-color;
      font-size: 14px;
      font-weight: 500;

      tr {
        &:hover {
          background-color: #f2f2f2;
          transition: all 0.1s ease-out;
          transform: scale(1.01);
        }
      }

      .td__cnpj {
        font-weight: 600;
        text-align: center;
      }

      .td__status {
        &--success {
          color: $success;
        }
        &--error {
          color: $error;
        }
        text-align: center;
      }

      .td__cnpj,
      .td__legal-name,
      .td__address,
      .td__status {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      td {
        padding: 1rem;
        border-bottom: 2px solid $light-text-color;
        cursor: pointer;
      }
    }
    .opened {
      .th__cnpj {
        max-width: calc(0.2 * (100vw - $opened-menu-offset));
      }
      .th__legal-name {
        max-width: calc(0.4 * (100vw - $opened-menu-offset));
      }
      .th__address {
        max-width: calc(0.3 * (100vw - $opened-menu-offset));
      }
      .th__status {
        max-width: calc(0.1 * (100vw - $opened-menu-offset));
      }
      .td__cnpj {
        max-width: calc(0.2 * (100vw - $opened-menu-offset));
      }
      .td__legal-name {
        max-width: calc(0.4 * (100vw - $opened-menu-offset));
      }
      .td__address {
        max-width: calc(0.3 * (100vw - $opened-menu-offset));
      }
      .td__status {
        max-width: calc(0.1 * (100vw - $opened-menu-offset));
      }
    }
    .closed {
      .th__cnpj {
        max-width: calc(0.2 * (100vw - $closed-menu-offset));
      }
      .th__legal-name {
        max-width: calc(0.4 * (100vw - $closed-menu-offset));
      }
      .th__address {
        max-width: calc(0.3 * (100vw - $closed-menu-offset));
      }
      .th__status {
        max-width: calc(0.1 * (100vw - $closed-menu-offset));
      }
      .td__cnpj {
        max-width: calc(0.2 * (100vw - $closed-menu-offset));
      }
      .td__legal-name {
        max-width: calc(0.4 * (100vw - $closed-menu-offset));
      }
      .td__address {
        max-width: calc(0.3 * (100vw - $closed-menu-offset));
      }
      .td__status {
        max-width: calc(0.1 * (100vw - $closed-menu-offset));
      }
    }
  }

  .v-list {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    gap: 0.4rem;

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 128px;
      max-height: 128px;
      gap: 0.2rem;
      padding: 0.5rem;
      cursor: pointer;
      color: $neutral-text-color;
      position: relative;

      background-color: #fff;
      border-radius: 8px;

      &-bundle--status {
        opacity: 0.8;

        p {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.4rem 2rem;
          max-width: fit-content;
          border-radius: 0px 8px 0px 8px;
          color: #fff;
          font-weight: 900;
          font-size: 14px;
        }
        .active {
          background-color: $success;
        }
        .inactive {
          background-color: $error;
        }
      }

      &-bundle {
        display: flex;
        flex-direction: column;
        width: 100%;

        &--title {
          font-size: 12px;
          font-weight: 900;
        }

        &--value {
          font-size: 14px;
        }
      }
    }
  }
}

.v-table-actions {
  display: flex;
  gap: 2rem;
}
</style>
