import Layout from '../../src/components/Layout';

export default function LinksPage() {
  return (
    <Layout>
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Useful Links
          </h2>
          <p className="text-gray-600">
            Essential resources for social work professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Professional Bodies */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Professional Bodies</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.basw.co.uk" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-blue-500">
                  British Association of Social Workers
                </a>
              </li>
              <li>
                <a href="https://www.socialworkengland.org.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Social Work England
                </a>
              </li>
              <li>
                <a href="https://www.hcpc-uk.org" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Health and Care Professions Council
                </a>
              </li>
            </ul>
          </div>

          {/* Professional Development */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Professional Development</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.skillsforcare.org.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Skills for Care
                </a>
              </li>
              <li>
                <a href="https://www.open.edu/openlearn/health-sports-psychology/social-care-social-work" 
                   target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  OpenLearn Social Work Courses
                </a>
              </li>
              <li>
                <a href="https://www.researchinpractice.org.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Research in Practice
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Resources */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Practice Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.scie.org.uk/mca/practice" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Mental Capacity Assessment Tools
                </a>
              </li>
              <li>
                <a href="https://www.ripfa.org.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Research in Practice Templates
                </a>
              </li>
              <li>
                <a href="https://www.nice.org.uk/guidance" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  NICE Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Support Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Support Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.socialworkersbenevolentfund.org" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Social Workers Benevolent Trust
                </a>
              </li>
              <li>
                <a href="https://www.basw.co.uk/professional-support-service" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  BASW Professional Support Service
                </a>
              </li>
              <li>
                <a href="https://www.supportline.org.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Support Line
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Legal & Policy</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.legislation.gov.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  UK Legislation
                </a>
              </li>
              <li>
                <a href="https://www.gov.uk/government/organisations/department-of-health-and-social-care" 
                   target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Department of Health and Social Care
                </a>
              </li>
              <li>
                <a href="https://www.familylaw.co.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Family Law Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Job Resources */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Job Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.communitycare.co.uk/jobs" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  Community Care Jobs
                </a>
              </li>
              <li>
                <a href="https://www.jobs.nhs.uk" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  NHS Jobs
                </a>
              </li>
              <li>
                <a href="https://www.basw.co.uk/jobs" target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-blue-500">
                  BASW Job Board
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
