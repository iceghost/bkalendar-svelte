<script context="module" lang="ts">
  export const ssr = false;

  export const load: import('@sveltejs/kit').Load = ({ page, fetch, session, context }) => {
    return {
      status: 300,
      redirect: '/agenda',
    };
  };
</script>

<div>Hello world</div>
