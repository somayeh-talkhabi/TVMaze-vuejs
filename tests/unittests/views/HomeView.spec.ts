import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import { homepageStore } from '@/stores/homepageStore'

vi.mock('@/stores/homepageStore', () => ({
  homepageStore: vi.fn(() => ({
    populateHomepageData: vi.fn(),
    topShows: [],
    showByGenres: []
  })),
}));

describe('HomeView.vue', () => {
  let populateHomepageData;

  beforeEach(() => {
    populateHomepageData = vi.fn();

    homepageStore.mockReturnValue({
      populateHomepageData,
      topShows: [],
      showByGenres: []
    });
  })

  it('calls populateHomepageData on mount', () => {
    mount(HomeView);

    expect(populateHomepageData).toHaveBeenCalledTimes(1)
  })
})