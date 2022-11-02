<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="v-details">
    <div class="mask" @click="$emit('close')" />
    <VSideBar
      :width="smallScreenAndDown ? '100%' : '500px'"
      from="right"
      background="secondary"
      class="sidebar"
    >
      <template v-slot:header>
        <div class="v-details-header">
          <p>Details</p>
          <fa-icon icon="xmark" @click="$emit('close')" />
        </div>
        <hr />
      </template>

      <template v-slot:body>
        <p class="v-details__title">
          {{ getDetailedOrganisation.legalEntityName }}
        </p>

        <div class="v-details__main">
          <div class="v-details__main-data">
            <p class="v-details__main-data--title">CNPJ</p>
            <p class="v-details__main-data--value">
              {{ getDetailedOrganisation.organisationCnpj }}
            </p>
          </div>
          <div class="v-details__main-data">
            <p class="v-details__main-data--title">Address</p>
            <p class="v-details__main-data--value">
              {{
                getDetailedOrganisation.address +
                ' - ' +
                getDetailedOrganisation.city
              }}
            </p>
          </div>
          <div class="v-details__main-data">
            <p class="v-details__main-data--title">Status</p>
            <p class="v-details__main-data--value">
              {{ getDetailedOrganisation.status }}
            </p>
          </div>
        </div>

        <div class="v-details__collapsible">
          <VCollapsible :open="showRoles" @toggle="showRoles = !showRoles">
            <template v-slot:header>
              <p class="v-details__collapsible--title">Roles</p>
            </template>
            <template v-slot:content>
              <div class="roles">
                <div
                  v-for="role in getDetailedOrganisation.roles"
                  :key="role.id"
                  class="roles__data"
                >
                  <p class="roles__data--role">{{ role.role }}</p>
                  <p class="roles__data--status" :class="role.status">
                    {{ role.status }}
                  </p>
                </div>
              </div>
            </template>
          </VCollapsible>
        </div>

        <div class="v-details__collapsible">
          <VCollapsible
            :open="showServers"
            @toggle="showServers = !showServers"
          >
            <template v-slot:header>
              <p class="v-details__collapsible--title">Servers</p>
            </template>
            <template v-slot:content>
              <div class="servers">
                <template v-for="server in getDetailedOrganisation.authServers">
                  <VCollapsible
                    :open="showServer(server.authorisationServerId)"
                    @toggle="toggleShowServer(server.authorisationServerId)"
                    class="server"
                  >
                    <template v-slot:header>
                      <p class="server__title">
                        {{ server.authServerName }}
                      </p>
                    </template>
                    <template v-slot:content>
                      <div class="server__data">
                        <p class="server__data--title">Description</p>
                        <p class="server__data--value">
                          {{ server.authServerDescription }}
                        </p>
                      </div>
                      <div
                        v-for="resource in server.apiResources"
                        :key="resource.familyType"
                        class="server__resource"
                      >
                        <p class="server__resource-title"></p>
                        <div class="server__resource-data">
                          <p class="server__resource-data--title">
                            Family Type
                          </p>
                          <p class="server__resource-data--value">
                            {{ resource.familyType }}
                          </p>
                        </div>
                        <div class="server__resource-data">
                          <p class="server__resource-data--title">Version</p>
                          <p class="server__resource-data--value">
                            {{ resource.version }}
                          </p>
                        </div>
                        <div class="server__resource-data">
                          <p class="server__resource-data--title">Endpoints:</p>
                        </div>
                        <div
                          v-for="endpoint in resource.endpoints"
                          :key="endpoint.ApiDiscoveryId"
                          class="server__resource-links"
                        >
                          <a :href="endpoint.ApiEndpoint">{{
                            endpoint.ApiEndpoint
                          }}</a>
                        </div>
                        <hr />
                      </div>
                    </template>

                    <div
                      v-for="resource in server.apiResources"
                      :key="resource.familyType"
                      class="server__resource"
                    >
                      <p class="server__resource-title"></p>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Family Type</p>
                        <p class="server__resource-data--value">
                          {{ resource.familyType }}
                        </p>
                      </div>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Version</p>
                        <p class="server__resource-data--value">
                          {{ resource.version }}
                        </p>
                      </div>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Endpoints:</p>
                      </div>
                      <div
                        v-for="endpoint in resource.endpoints"
                        :key="endpoint.ApiDiscoveryId"
                        class="server__resource-links"
                      >
                        <a :href="endpoint.ApiEndpoint">{{
                          endpoint.ApiEndpoint
                        }}</a>
                      </div>
                      <hr />
                    </div>
                    <div
                      v-for="resource in server.apiResources"
                      :key="resource.familyType"
                      class="server__resource"
                    >
                      <p class="server__resource-title"></p>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Family Type</p>
                        <p class="server__resource-data--value">
                          {{ resource.familyType }}
                        </p>
                      </div>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Version</p>
                        <p class="server__resource-data--value">
                          {{ resource.version }}
                        </p>
                      </div>
                      <div class="server__resource-data">
                        <p class="server__resource-data--title">Endpoints:</p>
                      </div>
                      <div
                        v-for="endpoint in resource.endpoints"
                        :key="endpoint.ApiDiscoveryId"
                        class="server__resource-links"
                      >
                        <a :href="endpoint.ApiEndpoint">{{
                          endpoint.ApiEndpoint
                        }}</a>
                      </div>
                      <hr />
                    </div>
                  </VCollapsible>
                </template>
              </div>
            </template>
          </VCollapsible>
        </div>
      </template>

      <template v-slot:footer>
        <VButton
          class="v-details__back-button"
          title="Back"
          type="primary"
          @click="$emit('close')"
        />
      </template>
    </VSideBar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mediaQueryMixin from '../../mixins/mediaQuery.mixin'

export default {
  name: 'DetailsPage',

  mixins: [mediaQueryMixin],

  components: {
    VButton: () => import('@/components/VButton.vue'),
    VSideBar: () => import('@/components/VSideBar.vue'),
    VCollapsible: () => import('@/components/VCollapsible.vue'),
  },

  data() {
    return {
      showRoles: true,
      showServers: true,
      serversToShow: [],
    }
  },

  computed: {
    ...mapGetters(['getDetailedOrganisation']),
  },

  methods: {
    showServer(server) {
      return this.serversToShow.includes(server)
    },

    toggleShowServer(server) {
      if (this.showServer(server)) {
        this.serversToShow = this.serversToShow.filter((sv) => sv !== server)
        return
      }
      this.serversToShow.push(server)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $dark-text-color;
  opacity: 0.2;
  cursor: pointer;
}

.v-details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  p {
    font-size: 18px;
    font-weight: 700;
    color: $dark-gray-color;
  }

  svg {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: $neutral-gray-color;
  }
}

.v-details__title {
  font-size: 18px;
  font-weight: 700;
  color: $medium-gray-color;
  width: 100%;
  margin: 1rem 0 2rem;
}
.v-details__main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.4rem;
  margin-bottom: 2rem;

  &-data {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    &--title {
      font-size: 14px;
      font-weight: 700;
      color: $darker-gray-color;
      line-height: 100%;
    }
    &--value {
      font-size: 16px;
      font-weight: 400;
      color: $medium-gray-color;
      line-height: 100%;
    }
  }
}

.v-details__collapsible {
  margin-bottom: 2rem;

  &--title {
    font-size: 16px;
    font-weight: 700;
    color: $darker-gray-color;
    line-height: 100%;
  }

  .roles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

    &__data {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid $neutral-gray-color;
      font-weight: 600;
      font-size: 14px;
      border-radius: 4px;
      max-width: fit-content;

      &--role {
        color: $medium-gray-color;
        padding: 0.2rem 1rem;
      }
      &--status {
        padding: 0.2rem 1rem;
        color: $secondary-color;
        background-color: $success;
      }
      .Active {
        background-color: $success;
      }
      .Inactive {
        background-color: $error;
      }
    }
  }

  .servers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .server {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &__title {
        font-size: 14px;
        font-weight: 700;
        color: $darker-gray-color;
        line-height: 100%;
      }

      &__data {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        margin-top: 0.4rem;

        &--title {
          font-size: 14px;
          font-weight: 700;
          color: $darker-gray-color;
          line-height: 100%;
        }
        &--value {
          font-size: 16px;
          font-weight: 400;
          color: $medium-gray-color;
          line-height: 100%;
        }
      }

      &__resource {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &-data {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;

          &--title {
            font-size: 14px;
            font-weight: 700;
            color: $darker-gray-color;
            line-height: 100%;
          }
          &--value {
            font-size: 16px;
            font-weight: 400;
            color: $medium-gray-color;
            line-height: 100%;
          }
        }

        &-links {
          height: 100%;
        }
      }
    }
  }
}

.v-details__back-button {
  display: block !important;
  width: 100%;
}

hr {
  margin: 1rem -1rem;
  border: none;
  border-bottom: 2px solid $background;
}
</style>
