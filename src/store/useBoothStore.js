export const useBoothStore = create((set) => ({
  form: {
    name: '',
    category: [],
    isOngoing: false,
    description: '',
    locationDescription: '',
    sns: {
      instagram: '',
      kakao: '',
    },
    schedule: [],
    notices: [],
    products: [],
  },

  // 🔥 API → store
  setFromApi: (data) =>
    set((state) => ({
      form: {
        ...state.form, // 🔥 기존 유지
        name: data.name,
        category: data.category,
        isOngoing: data.is_ongoing,
        description: data.description,
        locationDescription: data.location_description,

        sns: {
          instagram: data.sns?.[1] || '',
          kakao: data.sns?.[0] || '',
        },

        schedule: data.schedule || [],
        notices: data.latest_notice ? [data.latest_notice] : [],
        products: data.product || [],
      },
    })),

  // 기존
  setField: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    })),
}));
