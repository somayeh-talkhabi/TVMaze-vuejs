import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';
import { searchStore } from '@/stores/searchStore';
import SearchBox from '@/components/ui/SearchBox.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/stores/searchStore', () => ({
  searchStore: vi.fn(() => ({
    searchShows: vi.fn(),
    searchQuery: '',
    searchResults: [],
    searchCache: new Map(),
  })),
}));

describe('SearchBox.vue', () => {
  let push;
  let searchShows;

  beforeEach(() => {
    push = vi.fn();
    searchShows = vi.fn();

    useRouter.mockReturnValue({ push });
    searchStore.mockReturnValue({
      searchShows,
      searchQuery: '',
      searchResults: [],
      searchCache: new Map(),
    });
  });

  it('when Enter key is pressed after typing keywork in seach box then call searchShows and navigate to search view', async () => {
    const wrapper = mount(SearchBox);

    await wrapper.find('input').setValue('test');
    await wrapper.find('button').trigger('click');

    expect(searchShows).toHaveBeenCalledWith('test');
    expect(push).toHaveBeenCalledWith('/search/test');
  });

  it('when search button is clicked then call searchShows and navigate to search view', async () => {
    const wrapper = mount(SearchBox);

    await wrapper.find('input').setValue('test');
    await wrapper.find('input').trigger('keydown', { key: 'Enter' });

    expect(searchShows).toHaveBeenCalledWith('test');
    expect(push).toHaveBeenCalledWith('/search/test');
  });

  it('when query is empty then do not call searchShows', async () => {
    const wrapper = mount(SearchBox);

    await wrapper.find('button').trigger('click');

    expect(searchShows).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});