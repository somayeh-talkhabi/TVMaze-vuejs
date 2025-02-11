import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRouter, useRoute } from 'vue-router';
import { searchStore } from '@/stores/searchStore';
import SearchView from '@/views/SearchView.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    params: { query: 'test' },
  })),
}));

vi.mock('@/stores/searchStore', () => ({
  searchStore: vi.fn(() => ({
    searchShows: vi.fn(),
    searchQuery: 'test',
    searchResults: [],
  })),
}));

describe('SearchView.vue', () => {
  let push;
  let route;
  let store;

  beforeEach(() => {
    push = vi.fn();
    route = { params: { query: 'test' } };
    useRouter.mockReturnValue({ push });
    useRoute.mockReturnValue(route);
  });

  afterEach(() => {
    vi.restoreAllMocks()
  });

  it('when there is no result then display the message', async () => {
    store = searchStore()

    const wrapper = mount(SearchView);

    expect(wrapper.text()).toContain('No shows found');
    expect(wrapper.text()).toContain('Try adjusting your search criteria.');
  });

  it('when there is result for seach then the data should be part of document', async () => {
    searchStore.mockImplementation(() => ({
      searchShows: vi.fn(),
      searchQuery: 'test',
      searchResults: [
        { score: 0.95, show: { id: 1, name: 'Test Show 1' } },
        { score: 0.90, show: { id: 2, name: 'Test Show 2' } },
      ]
    }));

    store = searchStore();

    const wrapper = mount(SearchView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })

    expect(wrapper.text()).toContain("Search result for 'test'");
    expect(wrapper.text()).toContain('Test Show 1');
    expect(wrapper.text()).toContain('Test Show 2');
  });
});