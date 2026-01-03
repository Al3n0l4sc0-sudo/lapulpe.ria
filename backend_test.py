#!/usr/bin/env python3
"""
Backend API Testing for La Pulpería
Tests the specific endpoints mentioned in the review request:
1. Email Service Configuration
2. Create Online-Only Pulperia functionality
"""

import requests
import json
import sys
import os
import importlib.util
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://job-market-hub-1.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()
    
    def test_jobs_endpoint(self):
        """Test GET /api/jobs endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/jobs", timeout=10)
            
            if response.status_code == 200:
                jobs_data = response.json()
                if isinstance(jobs_data, list):
                    self.log_test(
                        "GET /api/jobs - Lista de empleos",
                        True,
                        f"Endpoint funciona correctamente. Retornó {len(jobs_data)} empleos"
                    )
                    
                    # Check if jobs have required fields
                    if jobs_data:
                        sample_job = jobs_data[0]
                        required_fields = ['job_id', 'title', 'description', 'category', 'pay_rate', 'location']
                        missing_fields = [field for field in required_fields if field not in sample_job]
                        
                        if not missing_fields:
                            self.log_test(
                                "Jobs data structure validation",
                                True,
                                "Los empleos contienen todos los campos requeridos"
                            )
                        else:
                            self.log_test(
                                "Jobs data structure validation",
                                False,
                                f"Campos faltantes en empleos: {missing_fields}",
                                sample_job
                            )
                    else:
                        self.log_test(
                            "Jobs data content",
                            True,
                            "Lista de empleos vacía (normal si no hay empleos creados)"
                        )
                else:
                    self.log_test(
                        "GET /api/jobs - Lista de empleos",
                        False,
                        f"Respuesta no es una lista. Tipo: {type(jobs_data)}",
                        jobs_data
                    )
            else:
                self.log_test(
                    "GET /api/jobs - Lista de empleos",
                    False,
                    f"Status code: {response.status_code}",
                    response.text
                )
                
        except Exception as e:
            self.log_test(
                "GET /api/jobs - Lista de empleos",
                False,
                f"Error de conexión: {str(e)}"
            )
    
    def test_pulperias_endpoint(self):
        """Test GET /api/pulperias endpoint and check for is_online_only field"""
        try:
            response = self.session.get(f"{self.base_url}/pulperias", timeout=10)
            
            if response.status_code == 200:
                pulperias_data = response.json()
                if isinstance(pulperias_data, list):
                    self.log_test(
                        "GET /api/pulperias - Lista de pulperías",
                        True,
                        f"Endpoint funciona correctamente. Retornó {len(pulperias_data)} pulperías"
                    )
                    
                    # Check for is_online_only field
                    if pulperias_data:
                        has_online_only_field = False
                        online_only_count = 0
                        
                        for pulperia in pulperias_data:
                            if 'is_online_only' in pulperia:
                                has_online_only_field = True
                                if pulperia.get('is_online_only', False):
                                    online_only_count += 1
                        
                        if has_online_only_field:
                            self.log_test(
                                "Pulperías is_online_only field validation",
                                True,
                                f"Campo is_online_only presente. {online_only_count} pulperías solo en línea encontradas"
                            )
                        else:
                            self.log_test(
                                "Pulperías is_online_only field validation",
                                False,
                                "Campo is_online_only no encontrado en las pulperías",
                                pulperias_data[0] if pulperias_data else {}
                            )
                            
                        # Check required fields
                        if pulperias_data:
                            sample_pulperia = pulperias_data[0]
                            required_fields = ['pulperia_id', 'name', 'owner_user_id']
                            missing_fields = [field for field in required_fields if field not in sample_pulperia]
                            
                            if not missing_fields:
                                self.log_test(
                                    "Pulperías data structure validation",
                                    True,
                                    "Las pulperías contienen todos los campos requeridos"
                                )
                            else:
                                self.log_test(
                                    "Pulperías data structure validation",
                                    False,
                                    f"Campos faltantes en pulperías: {missing_fields}",
                                    sample_pulperia
                                )
                    else:
                        self.log_test(
                            "Pulperías data content",
                            True,
                            "Lista de pulperías vacía (normal si no hay pulperías creadas)"
                        )
                else:
                    self.log_test(
                        "GET /api/pulperias - Lista de pulperías",
                        False,
                        f"Respuesta no es una lista. Tipo: {type(pulperias_data)}",
                        pulperias_data
                    )
            else:
                self.log_test(
                    "GET /api/pulperias - Lista de pulperías",
                    False,
                    f"Status code: {response.status_code}",
                    response.text
                )
                
        except Exception as e:
            self.log_test(
                "GET /api/pulperias - Lista de pulperías",
                False,
                f"Error de conexión: {str(e)}"
            )
    
    def test_featured_ads_endpoint(self):
        """Test GET /api/featured-ads endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/featured-ads", timeout=10)
            
            if response.status_code == 200:
                ads_data = response.json()
                if isinstance(ads_data, list):
                    self.log_test(
                        "GET /api/featured-ads - Lista de anuncios destacados",
                        True,
                        f"Endpoint funciona correctamente. Retornó {len(ads_data)} anuncios destacados"
                    )
                    
                    # Check if ads have required fields
                    if ads_data:
                        sample_ad = ads_data[0]
                        required_fields = ['ad_id', 'pulperia_id', 'pulperia_name', 'is_active']
                        missing_fields = [field for field in required_fields if field not in sample_ad]
                        
                        if not missing_fields:
                            self.log_test(
                                "Featured ads data structure validation",
                                True,
                                "Los anuncios destacados contienen todos los campos requeridos"
                            )
                        else:
                            self.log_test(
                                "Featured ads data structure validation",
                                False,
                                f"Campos faltantes en anuncios: {missing_fields}",
                                sample_ad
                            )
                            
                        # Check if ads are active
                        active_ads = [ad for ad in ads_data if ad.get('is_active', False)]
                        self.log_test(
                            "Featured ads active status",
                            True,
                            f"{len(active_ads)} de {len(ads_data)} anuncios están activos"
                        )
                    else:
                        self.log_test(
                            "Featured ads data content",
                            True,
                            "Lista de anuncios destacados vacía (normal si no hay anuncios activos)"
                        )
                else:
                    self.log_test(
                        "GET /api/featured-ads - Lista de anuncios destacados",
                        False,
                        f"Respuesta no es una lista. Tipo: {type(ads_data)}",
                        ads_data
                    )
            else:
                self.log_test(
                    "GET /api/featured-ads - Lista de anuncios destacados",
                    False,
                    f"Status code: {response.status_code}",
                    response.text
                )
                
        except Exception as e:
            self.log_test(
                "GET /api/featured-ads - Lista de anuncios destacados",
                False,
                f"Error de conexión: {str(e)}"
            )
    
    def test_backend_health(self):
        """Test basic backend connectivity"""
        try:
            # Try to access the root API endpoint
            response = self.session.get(f"{self.base_url.replace('/api', '')}/docs", timeout=5)
            
            if response.status_code == 200:
                self.log_test(
                    "Backend connectivity",
                    True,
                    "Backend está accesible y respondiendo"
                )
            else:
                self.log_test(
                    "Backend connectivity",
                    False,
                    f"Backend responde con status code: {response.status_code}"
                )
                
        except Exception as e:
            self.log_test(
                "Backend connectivity",
                False,
                f"No se puede conectar al backend: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("TESTING BACKEND APIs - La Pulpería")
        print("=" * 60)
        print(f"Backend URL: {self.base_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Test backend connectivity first
        self.test_backend_health()
        
        # Test specific endpoints from review request
        self.test_jobs_endpoint()
        self.test_pulperias_endpoint()
        self.test_featured_ads_endpoint()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"Total tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for test in self.test_results:
                if not test['success']:
                    print(f"❌ {test['test']}: {test['details']}")
        
        print(f"\nTest completed at: {datetime.now().isoformat()}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)