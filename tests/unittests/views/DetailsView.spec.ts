import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DetailsView from '@/views/DetailsView.vue'
import { getShowById } from '@/services/apiService'
import { useRoute } from 'vue-router'

vi.mock('@/services/apiService', () => ({
  getShowById: vi.fn(() => Promise.resolve({
    id: 1,
    name: "Test Show",
    summary: "<p>Test Summary</p>",
    image: { original: "test-image.jpg" },
    schedule: { days: ["Monday"], time: "8:00 PM" },
    rating: { average: 8.5 },
    status: "Running",
    genres: ["Drama", "Thriller"],
    _embedded: { cast: [] }
  }))
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' }
  })
}))

describe('DetailsShow.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls getShowById only once on mount', async () => {
    mount(DetailsView)

    expect(getShowById).toHaveBeenCalledTimes(1)
    expect(getShowById).toHaveBeenCalledWith(1)
  })
})
