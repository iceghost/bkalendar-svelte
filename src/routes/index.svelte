<script context="module" lang="ts">
  export const ssr = false;

  export const load: import('@sveltejs/kit').Load = () => {
    return {
      status: 300,
      redirect: '/agenda',
    };
  };
</script>

<div>Hello world</div>
