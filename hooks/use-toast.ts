// hooks/use-toast.ts - Mock simple para evitar error
export function useToast() {
  return {
    toast: ({ title, description, variant }: any) => {
      console.log(`Toast: ${title} - ${description}`);
    }
  };
}
