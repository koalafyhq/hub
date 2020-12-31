import Link from 'next/link'

import { Badge, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

import { dayAgo } from 'utils/date'
import { PROJECT_TYPE } from 'utils/constants'
import { getBadgeColor, humanizeBuilderName } from 'utils/builderHelpers'

const ProjectList = ({ projects }) => (
  <Table variant='simple' size='sm'>
    <Thead>
      <Tr>
        <Th>Nama</Th>
        <Th>Jenis Project</Th>
        <Th>URL</Th>
        <Th>Versi</Th>
        <Th>Aktivitas Terakhir</Th>
      </Tr>
    </Thead>
    <Tbody>
      {projects.map((project) => (
        <Tr>
          <Td>
            <Link href={`/projects/${project.name}`}>
              <a>{project.name}</a>
            </Link>
          </Td>
          <Td>
            {PROJECT_TYPE[project.type]} ({humanizeBuilderName(project.builder)}
            )
          </Td>
          <Td>
            {project.latestSuccessfulDeployment?.url ? (
              <a
                target='_blank'
                rel='noreferer noopener'
                href={project.latestSuccessfulDeployment.url}
              >
                {project.latestSuccessfulDeployment.url}
              </a>
            ) : (
              '-'
            )}
          </Td>
          <Td>
            <Badge
              colorScheme={getBadgeColor(
                project.latestSuccessfulDeployment?.status
              )}
            >
              {project.latestSuccessfulDeployment?.commitUrl ? (
                <a
                  target='_blank'
                  rel='noreferer noopener'
                  href={project.latestSuccessfulDeployment.commitUrl}
                >
                  {project.latestSuccessfulDeployment.version ?? '-'}
                </a>
              ) : (
                '-'
              )}
            </Badge>
          </Td>
          <Td>{dayAgo(project.updatedAt)}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export default ProjectList
