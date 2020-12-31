import { Box, SimpleGrid, Heading } from '@chakra-ui/react'

import { Layout, Content } from 'components/Layout'
import { EmptyProject } from 'components/EmptyState'
import { StatsCard } from 'components/Card'

import fetchWithCtx from 'utils/fetchWithCtx'

import ProjectList from 'fragments/ProjectList'

export default function Page({ stats, projects }) {
  // TODO: create actual check
  const systemStatus = 'OK'

  const { activePlan, totalProjects, totalDeployments } = stats

  const hasProjects = projects.length >= 1

  const statsList = [
    {
      title: 'Paket',
      content: activePlan,
    },
    {
      title: 'Jumlah Projects',
      content: totalProjects,
    },
    {
      title: 'Jumlah Deployments',
      content: totalDeployments,
    },
    {
      title: 'Status Sistem',
      content: systemStatus,
    },
  ]

  let content

  if (hasProjects) {
    content = <ProjectList projects={projects} />
  } else {
    content = <EmptyProject />
  }

  return (
    <Layout>
      <Box bg='#ff7b7b' paddingTop='4rem' marginTop='-2rem'>
        <SimpleGrid
          columns={4}
          spacing={10}
          marginX='2rem'
          borderRadius='10px'
          paddingTop='10px'
          paddingBottom='30px'
          maxWidth='100%'
          overflowX='auto'
        >
          {statsList.map((stats) => (
            <StatsCard
              key={stats.title}
              title={stats.title}
              content={stats.content}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Content>
        <Heading size='md' mb={6}>
          Daftar Project
        </Heading>
        {content}
      </Content>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const data = await fetchWithCtx(`/api/stats`, context)

  return {
    props: data,
  }
}
